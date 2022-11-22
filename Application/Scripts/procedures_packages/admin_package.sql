select * from user_objects where OBJECT_NAME like '%ADMIN_PACKAGE%' and object_type ='PACKAGE';

drop package admin_package;

create or replace package admin_package is
    --get all notes by role
    function get_all_persons_by_role(role nvarchar2) return sys_refcursor;
    --register user
    procedure register_user(get_login nvarchar2,
        password nvarchar2,
        get_role nvarchar2,
        get_email nvarchar2,
        get_street nvarchar2 default '',
        get_house nvarchar2 default '');

    --authorisation accaunt
    function authorisation(get_login nvarchar2,
        get_password nvarchar2) return boolean;

    --add good
    procedure add_good(good_name goods.name%type,
                       good_description goods.description%type,
                       good_price goods.price%type);

    --add goodstoorders
    procedure add_goods_to_order(order_id orders.id%type, good_id goods.id%type);

    --change order executor and delivery location
    --change order executor and deliverypoint
         procedure change_executor_and_delivery_point(order_id orders.id%type,
                                    executor_id orders.excecutorprofileid%type, deliverypoint_id orders.deliverylocationid%type);
     ------------support functions-----------------
    function encrypt_password(password  varchar2) return userlogin.password%type;
    function dencrypt_password(password_hash varchar2) return varchar2;
end admin_package;


create or replace package body admin_package is

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
        password nvarchar2,
        get_role nvarchar2,
        get_email nvarchar2,
        get_street nvarchar2 default '',
        get_house nvarchar2 default '')
    is
        password_hash nvarchar2(200);
        userlogin_id userlogin.id%type;
    begin
        password_hash := encrypt_password(password);
        insert into userlogin (login, password, role) values (get_login, password_hash, get_role);
        commit;

        select id into userlogin_id from userlogin where userlogin.login = get_login ;

        insert into userprofile (email, userloginid) values (get_email, userlogin_id);
        commit;

        --todo insert userpoint coordinates???
        null;
    end register_user;

    --authorisation accaunt
    function authorisation(get_login nvarchar2,
        get_password nvarchar2) return boolean
        is
        select_password userlogin.password%type;
        decode_password userlogin.password%type;

        no_such_profile_exception exception;
        pragma exception_init(no_such_profile_exception, 100);
            begin
            select password into select_password from userlogin where login = get_login;
            decode_password := admin_package.dencrypt_password(select_password);
            return decode_password = get_password;
            exception when no_such_profile_exception then
                return false;
        end authorisation;

        procedure add_good(good_name goods.name%type,
                       good_description goods.description%type,
                       good_price goods.price%type)
            is
            begin
                insert into goods (name,description, price)
                values (good_name, good_description, good_price);
                commit;
            end add_good;

         --add goodstoorder
          procedure add_goods_to_order(order_id orders.id%type, good_id goods.id%type)
         is begin
             insert into goodstoorder values (order_id, good_id);
             commit;
             end;

        --change order executor and deliverypoint
         procedure change_executor_and_delivery_point(order_id orders.id%type,
                                    executor_id orders.excecutorprofileid%type, deliverypoint_id orders.deliverylocationid%type)
         is
             begin
                 update orders set excecutorprofileid = executor_id, deliverylocationid = deliverypoint_id
                               where orders.id = order_id;
                 commit;
            end change_executor_and_delivery_point;

         ------------support functions-----------------
function encrypt_password(password varchar2) return userlogin.password%type
    is
    hash_password userlogin.password%type;
    begin
        hash_password :=  utl_encode.text_encode(password,'AL32UTF8',UTL_ENCODE.BASE64);
        return hash_password;
    end encrypt_password;

function dencrypt_password(password_hash varchar2) return varchar2
    is
    begin
        return utl_encode.text_decode(password_hash,'AL32UTF8',UTL_ENCODE.BASE64);
    end dencrypt_password;
end admin_package;

--test get_all_persons_by_role
declare
    info sys_refcursor;
    row nvarchar2(10);
begin
   info := admin_package.get_all_persons_by_role('user', 'asd');
    loop
        fetch info into row;
        exit when info%notfound;
       dbms_output.put_line(row);
       end loop;
end;

