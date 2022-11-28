create or replace package staff_package as
    --change order status by id
    procedure change_order_status_by_name(order_name orders.ordername%type,
                                          get_status orders.status%type);

    --get reviews
    function get_reviews return sys_refcursor;
    --get orders processed
    function get_processed_order_to_staff_by_login(staff_login userlogin.login%type) return sys_refcursor;
end staff_package;


create or replace package body staff_package as
    --change order status by id
    procedure change_order_status_by_name(order_name orders.ordername%type,
                                          get_status orders.status%type)
        is
    begin
        update orders set status = get_status where orders.ordername = order_name;
        update history set status = get_status where history.ordername = order_name;
        commit;
        exception when others then raise_application_error(-20001, 'Updating order failed');
    end change_order_status_by_name;

    --get processed orders to staff
        function get_processed_order_to_staff_by_login(staff_login userlogin.login%type) return sys_refcursor
        is
        processed_orders_cursor sys_refcursor;
    begin
        open processed_orders_cursor for select o1.ordername          as order_name,
                                                  o1.orderdate          as order_date,
                                                  o1.deliverydate       as delivery_date,
                                                  o1.price       as order_price,
                                                  o1.DELIVERYTYPE       as delivery_type,
                                                  o1.status       as order_status,
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
                                           where o1.status = 'processed' and userlogin.login = staff_login;
        return processed_orders_cursor;
        exception when no_data_found then
            raise no_data_found;
            when others then raise_application_error(-20000, 'Getting orders failed');
        end;

    --get reviews
    function get_reviews
        return sys_refcursor
        is
        cursor_reviews sys_refcursor;
    begin
        open cursor_reviews
            for select content, estimation, userlogin.login as login
                from reviews
                         join userprofile
                              on reviews.userprofileid = userprofile.id
                         join USERLOGIN
                              on userprofile.userloginid = userlogin.id;


        return cursor_reviews;
    end get_reviews;

end staff_package;