create or replace package staff_package as
    --change order status by id
    procedure change_order_status_by_id(order_id orders.id%type,
        get_status orders.status%type);

    --get reviews
    function get_reviews return sys_refcursor;
        --test func return string
function get_string return nvarchar2;
    end staff_package;


create or replace package body staff_package as
     --change order status by id
    procedure change_order_status_by_id(order_id orders.id%type,
        get_status orders.status%type)
    is
    begin
        update orders set status = get_status where orders.id = order_id;
        commit;
        end change_order_status_by_id;

    --get reviews
    function get_reviews
          return sys_refcursor
    is
          cursor_reviews sys_refcursor;
    begin
        open cursor_reviews
            for select content, estimation, userlogin.login as login
                from reviews join userprofile
                on reviews.userprofileid = userprofile.id join USERLOGIN
                on userprofile.userloginid = userlogin.id;


        return cursor_reviews;
        end get_reviews;

         --test func return string
function get_string
    return nvarchar2
    is
    begin
        return 'test';
        end get_string;
    end staff_package;