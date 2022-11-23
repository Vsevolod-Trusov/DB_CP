
create or replace package user_package as
    --get_distance_line
  function get_distance_between_deliverypoint_customer(delivery_point POINTS.LOCATION%type,
  customer_location POINTS.LOCATION%type) return number;
    --add order
   function add_order(customer_login userlogin.login%type, good_name goods.name%type,
                       get_data_order date default sysdate, get_delivery_date date) return orders.ordername%type;
    --add history
   procedure add_history(order_id orders.id%type,order_name orders.ordername%type, order_status orders.status%type);

    --get good id
    function get_good_id(good_name goods.name%type, good_description goods.description%type,
                            good_price goods.price%type) return goods.id%type;
    --get all goods
    function get_all_goods return sys_refcursor;

     --get good by name
    function get_good_by_name(good_name goods.name%type) return sys_refcursor; --return goods%rowtype;

    --delete order
    procedure delete_order_by_id(order_id orders.id%type);
    --add review
    procedure add_review(get_content reviews.content%type, get_estimation reviews.estimation%type,
                            get_login userlogin.login%type);

end user_package;

create or replace package body user_package as
    --get_distance_line
   function get_distance_between_deliverypoint_customer(delivery_point POINTS.LOCATION%type,
  customer_location POINTS.LOCATION%type) return number
      is
        distance number;
      begin
         select sdo_geom.sdo_distance(delivery_point, customer_location, 0.01,'unit=km') into distance from dual;
        return distance;
    end get_distance_between_deliverypoint_customer;

    --add order
    function add_order(customer_login userlogin.login%type, good_name goods.name%type,
                       get_data_order date default sysdate, get_delivery_date date) return orders.ordername%type
    is
        customer_profile_id userprofile.id%type;
        executor_profile_id userprofile.id%type;

        order_id orders.id%type;
        good_id goods.id%type;
        start_deliverylocation orders.deliverylocationid%type;

        unprocessed_status orders.status%type := 'unprocessed';

        userlocation_id points.id%type;

        order_name orders.ordername%type := 'order';
        no_such_profile_exception exception;
        other_exception exception;
        pragma exception_init(no_such_profile_exception, 100);
    begin
        select userprofile.id into customer_profile_id from userprofile join userlogin
            on userprofile.userloginid = userlogin.id where userlogin.login = customer_login;

        select userprofile.id into executor_profile_id from userprofile join userlogin
            on userprofile.userloginid = userlogin.id where userlogin.login = 'executor';

        select userprofile.userpointid into userlocation_id from userprofile where userprofile.id = customer_profile_id;

        select points.id into start_deliverylocation from points fetch first 1 rows only;

        insert into orders (customerprofileid, excecutorprofileid, deliverylocationid, status, userlocationid, orderdate, deliverydate)
        values (customer_profile_id, executor_profile_id, start_deliverylocation, unprocessed_status, userlocation_id, get_data_order, get_delivery_date)
        returning id into order_id;

        order_name := 'order_'||order_id;
        update orders set ORDERNAME= order_name where orders.id = order_id;-- into orders(ordername) values (order_name);
        commit;

        select goods.id into good_id from goods where goods.name = good_name;
        user_package.add_history(order_id,order_name, unprocessed_status);
        admin_package.add_goods_to_order(order_id, good_id );
        return order_name;
        exception when no_such_profile_exception then
            raise no_such_profile_exception;
            when others then
            raise other_exception;
    end add_order;

    --add history
    procedure add_history(order_id orders.id%type,order_name orders.ordername%type, order_status orders.status%type)
    is
    begin
        insert into history(orderid,ordername, status) values (order_id, order_name, order_status);
        commit;
    end add_history;

    --get good id не нужно
     function get_good_id(good_name goods.name%type, good_description goods.description%type,
                            good_price goods.price%type) return goods.id%type
    is
        good_id goods.id%type;
    begin
        select goods.id into good_id from goods
                                     where name = good_name and
                                           description = good_description and
                                           price = good_price;
        return good_id;
        end;

    --get all goods
    function get_all_goods return sys_refcursor
        is
        goods sys_refcursor;
        begin
            open goods for select * from goods;
            return goods;
        end get_all_goods;

    --get good by name
            function get_good_by_name(good_name goods.name%type) return sys_refcursor
        is
            cursor_good sys_refcursor;
        begin
            open cursor_good  for select *  from goods where goods.name = good_name;
            return cursor_good;
            exception when no_data_found then
                raise no_data_found;
            end;

    --delete order by id
        procedure delete_order_by_id(order_id orders.id%type)
    is begin
        delete from orders where orders.id = order_id ;
        commit;
        end delete_order_by_id;

    --add review
    procedure add_review(get_content reviews.content%type, get_estimation reviews.estimation%type,
                            get_login userlogin.login%type)
    is
        userprofile_id userprofile.id%type;

        other_exception exception;
        begin
            select userprofile.id into userprofile_id from userprofile join userlogin
                on userprofile.userloginid = userlogin.id where userlogin.login = get_login;

            insert into reviews (content, estimation, userprofileid)
                values (get_content, get_estimation, userprofile_id);
            commit;
            exception when no_data_found then
                raise no_data_found;
            when others then
            raise other_exception;
            end add_review;
end user_package;

    declare
        test_user_point POINTS.LOCATION%type;
        test_delivery_point points.LOCATION%type;
    begin
        select POINTS.LOCATION into test_user_point from POINTS fetch first 1 rows only ;
        --dbms_output.put_line(test_user_point.SDO_POINT);
        select POINTS.LOCATION into test_delivery_point from POINTS fetch first 1 rows only ;
        --dbms_output.put_line(test_delivery_point.SDO_POINT);
        dbms_output.put_line(user_package.get_distance_between_deliverypoint_customer(test_user_point, test_delivery_point));
    end;

    select sdo_geom.sdo_distance((select POINTS.LOCATION from POINTS order by POINT_NAME desc fetch first 1 rows only),
        (select POINTS.LOCATION from POINTS order by POINT_NAME fetch first 1 rows only ),0.005,'unit=km') from dual;

select road from roads fetch first 3 rows only;