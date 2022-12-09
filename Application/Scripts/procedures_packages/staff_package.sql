create or replace package staff_package as
    --get processed orders count
    function get_processed_orders_count_by_login(staff_login userlogin.login%type) return number;
    --change order status by id
    procedure change_order_status_by_name(order_name orders.ordername%type,
                                          get_status orders.status%type);

    --get reviews
    function get_reviews return sys_refcursor;
    --get orders processed
    function get_processed_order_to_staff_by_login(staff_login userlogin.login%type) return sys_refcursor;
end staff_package;


create or replace package body staff_package as
     function get_processed_orders_count_by_login(staff_login userlogin.login%type) return number
         is
         count_orders number;
         profile_id orders.EXCECUTORPROFILEID%type;
             begin
                 select userprofile.id into profile_id from userprofile join userlogin
                                                   on userprofile.userloginid = userlogin.id
                                                   where userlogin.login = staff_login;
                    select count(*) into count_orders from orders where status = 'processed' and EXCECUTORPROFILEID = profile_id;
                 return count_orders;
                 end;
    --change order status by id
    procedure change_order_status_by_name(order_name orders.ordername%type,
                                          get_status orders.status%type)
        is
    begin
        update orders set status = get_status where orders.ordername = order_name;
        commit;
        exception when
            others then rollback; raise_application_error(-20001, 'Updating order failed');
    end change_order_status_by_name;

    --get processed orders to staff
        function get_processed_order_to_staff_by_login(staff_login userlogin.login%type) return sys_refcursor
        is
        processed_orders_cursor sys_refcursor;
    begin
        open processed_orders_cursor for select * from processed_orders_view
                                           where processed_orders_view.order_status = 'processed'
                                             and processed_orders_view.executor_login = staff_login;
        return processed_orders_cursor;
        exception when no_data_found then
            raise_application_error(-20001, 'Such staff profile does not exist');
            when others then raise_application_error(-20000, 'Getting orders failed');
        end;

    --get reviews
    function get_reviews
        return sys_refcursor
        is
        cursor_reviews sys_refcursor;
    begin
        open cursor_reviews
            for select * from reviews_view;
        return cursor_reviews;
    end get_reviews;

end staff_package;