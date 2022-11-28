select *
from user_objects
where OBJECT_NAME like '%ADMIN_PACKAGE%'
  and object_type = 'PACKAGE';

drop package admin_package;

create or replace package admin_package is
    --get all notes by role
    function get_all_persons_by_role(role nvarchar2) return sys_refcursor;
    --get all points name
    function get_all_points_name return sys_refcursor;
    --register user
    procedure register_user(get_login nvarchar2,
                            get_userpoint_name points.point_name%type,
                            password nvarchar2,
                            get_role nvarchar2,
                            get_email nvarchar2);

    --get executors by point name
    function get_executors_by_point_name(get_point_name points.point_name%type) return sys_refcursor;
    --authorisation accaunt
    function authorisation(get_login nvarchar2,
                           get_password nvarchar2) return sys_refcursor;
    --add good
    procedure add_good(good_name goods.name%type,
                       good_description goods.description%type,
                       good_price goods.price%type);
    --delete good by name
    procedure delete_good_by_name(good_name goods.name%type);
    --add goodstoorders
    procedure add_goods_to_order(order_id orders.id%type, good_id goods.id%type);

    --get unprocessed orders
    function get_unprocessed_orders return sys_refcursor;

    --change order executor and delivery location
    procedure update_order_executor_deliverypoint(order_name orders.ordername%type,
                                                  order_executor_login userlogin.login%type,
                                                  deliverypoint_name points.point_name%type, get_order_price orders.price%type);
    ------------support functions-----------------
    function encrypt_password(password varchar2) return userlogin.password%type;
    function dencrypt_password(password_hash varchar2) return varchar2;
end admin_package;


create or replace package body admin_package is
    --get executors by point name
    function get_executors_by_point_name(get_point_name points.point_name%type) return sys_refcursor
        is
        point_id         points.id%type;
        executors_cursor sys_refcursor;
        executor_login   userlogin.login%type;
        no_such_executors exception;
        pragma exception_init (no_such_executors, -20001);

    begin
        select id into point_id from points where points.point_name = get_point_name;
        open executors_cursor for select login,
                                         (select count(*)
                                          from orders
                                                   join userprofile on ORDERS.EXCECUTORPROFILEID = USERPROFILE.ID
                                                   join userlogin ul1
                                                        on ul1.id = userprofile.USERLOGINID
                                          where
                                             ul1.login != 'executor'
                                            and ul1.id = ul2.id) as orders_count
                                  from userlogin ul2 join userprofile on ul2.id = userprofile.userloginid
                                  where ul2.role = 'staff'
                                     and USERPROFILE.USERPOINTID = point_id
                                    and ul2.login != 'executor';
        /*fetch executors_cursor into executor_login;
        while executors_cursor%found loop
            fetch executors_cursor into executor_login;
            dbms_output.put_line(executor_login);
        end loop;
        if executors_cursor%rowcount = 0 then
            raise no_such_executors;
        end if;*/
        return executors_cursor;
    exception
        when no_data_found then
            raise no_data_found;
        /*    when no_such_executors then
                raise no_data_found;*/
        when others then
            raise_application_error(-20000, 'get_executors_by_point_name error');
    end;


    --delete good by name
    procedure delete_good_by_name(good_name goods.name%type)
        is
        good_id goods.id%type;
    begin
        select id into good_id from goods where name = good_name;
        delete from goods where id = good_id;
        commit;
    exception
        when no_data_found then
            raise no_data_found;
        when others then
            raise_application_error(-20001, 'Error in delete_good_by_name');
    end;
--get all point names
    function get_all_points_name return sys_refcursor
        is
        cursor_name sys_refcursor;
    begin
        open cursor_name for
            select point_name, type
            from points;
        return cursor_name;
    end;
    --get all notes by role
    function get_all_persons_by_role(role nvarchar2)
        return sys_refcursor
        is
        table_info sys_refcursor;
    begin
        open table_info
            for select login from userlogin where UserLogin.ROLE = role;
        return table_info;
    end get_all_persons_by_role;

    --register user
    procedure register_user(get_login nvarchar2,
                            get_userpoint_name points.point_name%type,
                            password nvarchar2,
                            get_role nvarchar2,
                            get_email nvarchar2)
        is
        password_hash nvarchar2(200);
        userlogin_id  userlogin.id%type;
        userpoint_id  points.id%type;
    begin
        password_hash := encrypt_password(password);
        insert into userlogin (login, password, role) values (get_login, password_hash, get_role);

        select id into userlogin_id from userlogin where userlogin.login = get_login;
        select id into userpoint_id from points where rtrim(POINT_NAME) = rtrim(get_userpoint_name);
        insert into userprofile (email, userpointid, userloginid)
        values (get_email, userpoint_id, userlogin_id);
        commit;
    exception
        when no_data_found then rollback; raise no_data_found;
        when others then rollback; raise_application_error(sqlcode, sqlerrm);
    end register_user;

    --authorisation accaunt
    function authorisation(get_login nvarchar2,
                           get_password nvarchar2) return sys_refcursor
        is
        login_role_cursor sys_refcursor;
        select_password   userlogin.password%type;
        decode_password   userlogin.password%type;

        no_such_profile_exception exception;
        pragma exception_init (no_such_profile_exception, 100);
    begin
        select password into select_password from userlogin where login = get_login;
        decode_password := admin_package.dencrypt_password(select_password);
        if decode_password = get_password then
            open login_role_cursor for select login, role from userlogin where login = get_login;
            return login_role_cursor;
        else
            raise no_such_profile_exception;
        end if;
    exception
        when no_such_profile_exception then
            raise no_such_profile_exception;
        when others then
            raise_application_error(-2000, sqlerrm);
    end authorisation;




 /*(select count(*)
                                                      from userprofile
                                                               join points p1
                                                                    on userprofile.USERPOINTID = p1.id
                                                               join userlogin on
                                                          userprofile.USERLOGINID = userlogin.id
                                                      where userlogin.role= 'staff' and p1.id = p2.id)  as staff_count*/
    --add good
    procedure add_good(good_name goods.name%type,
                       good_description goods.description%type,
                       good_price goods.price%type)
        is
    begin
        insert into goods (name, description, price)
        values (good_name, good_description, good_price);
        commit;
    end add_good;

    --add goodstoorder
    procedure add_goods_to_order(order_id orders.id%type, good_id goods.id%type)
        is
    begin
        insert into goodstoorder values (order_id, good_id);
        commit;
    end;

    --get unprocessed orders
    function get_unprocessed_orders return sys_refcursor
        is
        unprocessed_orders_cursor sys_refcursor;
    begin
        open unprocessed_orders_cursor for select o1.ordername          as order_name,
                                                  o1.orderdate          as order_date,
                                                  o1.deliverydate       as delivery_date,
                                                  o1.status       as order_status,
                                                  o1.price       as order_price,
                                                  o1.DELIVERYTYPE       as delivery_type,
                                                  g.name                as good_name,
                                                  userlogin.login       as executor_login,

                                                  (select userlogin.login
                                                   from orders o2
                                                            join userprofile
                                                                 on o2.customerprofileid = userprofile.id
                                                            join
                                                        userlogin on userprofile.userloginid = userlogin.id
                                                   where o2.id = o1.id) as customer_login,

                                                  points.point_name     as delivery_point,
                                                  (select points.point_name
                                                   from points
                                                            join orders o2
                                                                 on o2.userlocationid = points.id
                                                   where o2.id = o1.id) as user_point

                                           from orders o1
                                                    join points on o1.deliverylocationid = points.id
                                                    join goodstoorder gto on o1.id = gto.orderid
                                                    join goods g on gto.goodsid = g.id
                                                    join USERPROFILE on o1.excecutorprofileid = userprofile.id
                                                    join userlogin
                                                         on userprofile.userloginid = userlogin.id
                                           where o1.status = 'unprocessed';
        return unprocessed_orders_cursor;
    end;
    procedure update_order_executor_deliverypoint(order_name orders.ordername%type,
                                                  order_executor_login userlogin.login%type,
                                                  deliverypoint_name points.point_name%type,
                                                  get_order_price orders.price%type)
        is
        order_executor_id orders.excecutorprofileid%type;
        deliverypoint_id  orders.DELIVERYLOCATIONID%type;
    begin
        select userprofile.id
        into order_executor_id
        from userprofile
                 join userlogin
                      on userprofile.userloginid = userlogin.id
        where userlogin.login = order_executor_login;

        select points.id into deliverypoint_id from points where points.point_name = deliverypoint_name;

        update orders
        set Orders.Status= 'processed',
            ORDERS.EXCECUTORPROFILEID = order_executor_id,
            orders.DELIVERYLOCATIONID = deliverypoint_id,
            orders.price = get_order_price
        where orders.ordername = order_name;
        update history set history.status = 'processed' where history.ordername = order_name;
        commit;
    exception
        when no_data_found then raise no_data_found;
    end update_order_executor_deliverypoint;

    ------------support functions-----------------
    function encrypt_password(password varchar2) return userlogin.password%type
        is
        hash_password userlogin.password%type;
    begin
        hash_password := utl_encode.text_encode(password, 'AL32UTF8', UTL_ENCODE.BASE64);
        return hash_password;
    end encrypt_password;

    function dencrypt_password(password_hash varchar2) return varchar2
        is
    begin
        return utl_encode.text_decode(password_hash, 'AL32UTF8', UTL_ENCODE.BASE64);
    end dencrypt_password;

end admin_package;


--test get_all_persons_by_role
declare
    info sys_refcursor;
    row  nvarchar2(10);
begin
    info := admin_package.get_all_persons_by_role('user', 'asd');
    loop
        fetch info into row;
        exit when info%notfound;
        dbms_output.put_line(row);
    end loop;
end;

