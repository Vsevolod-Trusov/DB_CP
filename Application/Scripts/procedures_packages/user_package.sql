create or replace package user_package as
    --get pagination goods between start value and end value
    function get_pagination_goods(start_value number, end_value number) return sys_refcursor;
    --get executor login by order id
    function get_executor_login_by_order_id(order_id orders.id%type) return userlogin.login%type;
    --get routes by user login
    function get_routes_by_user_login(user_login userlogin.login%type) return sys_refcursor;
    --get analise abount customer poin and all delivery points
    function get_route_length_analysis(customer_point_name points.point_name%type) return sys_refcursor;
    --get_distance_line
    function get_distance_between_deliverypoint_customer(delivery_point_name POINTS.POINT_NAME%type,
                                                         customer_location_name POINTS.POINT_NAME%type) return number;
    --add order
    function add_order(customer_login userlogin.login%type, good_name goods.name%type,
                       get_data_order date default sysdate, get_delivery_date date,
                       get_delivery_type orders.deliverytype%type,
                       get_order_price orders.price%type,
                       get_delivery_point_pickup points.point_name%type) return orders.ordername%type;
    --get orders by login
    function get_orders_not_executed_by_login(user_login userlogin.login%type) return sys_refcursor;
    --add history
    procedure add_history(order_id orders.id%type, customer_login userlogin.login%type,
                          order_name orders.ordername%type, order_status orders.status%type);
    --get history
    function get_history_by_login(customer_login userlogin.login%type) return sys_refcursor;
    --get all goods
    function get_all_goods return sys_refcursor;

    --get good by name
    function get_good_by_name(good_name goods.name%type) return sys_refcursor; --return goods%rowtype;

    --delete order
    procedure delete_order_by_name(order_name orders.ordername%type);
    --add review
    procedure add_review(get_content reviews.content%type, get_estimation reviews.estimation%type,
                         get_login userlogin.login%type);

end user_package;

create or replace package body user_package as
    --get pagination goods between start value and end value
    function get_pagination_goods(start_value number, end_value number) return sys_refcursor
        is
        get_pagination_goods_cursor sys_refcursor;
        row_count                   number;
        wrong_input_data exception;
    begin
        select count(*) into row_count from goods;
        if start_value > row_count then
            raise wrong_input_data;
        end if;

        if start_value < 0 or end_value < 0 then
            raise wrong_input_data;
        elsif start_value > end_value then
            raise wrong_input_data;
        end if;

        open get_pagination_goods_cursor for
            select *
            from (select goods.*,
                         ROWNUM rnum
                  from (select * from goods) goods
                  where ROWNUM <= end_value)
            where rnum >= start_value;
        return get_pagination_goods_cursor;
    exception
        when wrong_input_data then
            raise_application_error(-20001, 'Wrong input data');
    end get_pagination_goods;
--get executor login by order id
    function get_executor_login_by_order_id(order_id orders.id%type) return userlogin.login%type
        is
        executor_login userlogin.login%type;
    begin
        select userlogin.login
        into executor_login
        from orders o2
                 join userprofile
                      on o2.excecutorprofileid = userprofile.id
                 join
             userlogin on userprofile.userloginid = userlogin.id
        where o2.id = order_id;
        return executor_login;
    exception
        when no_data_found then raise_application_error(-20001, 'No such order');
    end;

--get routes by user login
    function get_routes_by_user_login(user_login userlogin.login%type) return sys_refcursor
        is
        routes_by_login sys_refcursor;
        point_name      points.point_name%type;
    begin
        select points.point_name
        into point_name
        from points
                 join userprofile on userprofile.USERPOINTID = points.id
                 join userlogin on userlogin.id = userprofile.userloginid
        where userlogin.login = user_login;

        routes_by_login := user_package.get_route_length_analysis(point_name);
        return routes_by_login;
    exception
        when no_data_found then
            raise_application_error(-20001, 'Such user profile does not exist');
        when others then raise_application_error(-20000, 'Error in get_routes_by_user_login');
    end;
--get analysis
    function get_route_length_analysis(customer_point_name points.point_name%type) return sys_refcursor
        is
        analysys_route_length_cursor sys_refcursor;
    begin
        open analysys_route_length_cursor for select p2.point_name                                                    as delivery_point,
                                                     get_distance_between_deliverypoint_customer(p2.point_name,
                                                                                                 customer_point_name) as distance,
                                                     count(*)                                                         as staff_count
                                              from userprofile
                                                       join points p1
                                                            on userprofile.USERPOINTID = p1.id
                                                       join userlogin on
                                                  userprofile.USERLOGINID = userlogin.id
                                                       join points p2 on p2.id = userprofile.USERPOINTID
                                              where p2.type = 'staff'
                                                and userlogin.role = 'staff'
                                                and userlogin.login != 'executor'
                                              group by p2.point_name, customer_point_name;
        return analysys_route_length_cursor;
    exception
        when no_data_found then raise_application_error(-20001, 'Such customer point does not exist');
    end;

--get_distance_line
    function get_distance_between_deliverypoint_customer(delivery_point_name POINTS.POINT_NAME%type,
                                                         customer_location_name POINTS.POINT_NAME%type) return number
        is
        distance       number;
        delivery_point points.location%type;
        customer_point points.location%type;
    begin
        select location
        into delivery_point
        from points
        where points.type = 'staff'
          and rtrim(POINT_NAME) = rtrim(delivery_point_name);
        select location
        into customer_point
        from points
        where points.type = 'user'
          and rtrim(POINT_NAME) = rtrim(customer_location_name);

        select sdo_geom.sdo_distance(delivery_point, customer_point, 0.01, 'unit=km') into distance from dual;
        return distance;
    exception
        when no_data_found then raise_application_error(-20002, 'Such delivery or customer point do not exist');
        when others then raise_application_error(-20001, sqlerrm);
        return -1;
    end get_distance_between_deliverypoint_customer;

--add order
    function add_order(customer_login userlogin.login%type, good_name goods.name%type,
                       get_data_order date default sysdate, get_delivery_date date,
                       get_delivery_type orders.deliverytype%type,
                       get_order_price orders.price%type,
                       get_delivery_point_pickup points.point_name%type) return orders.ordername%type
        is
        customer_profile_id    userprofile.id%type;
        executor_profile_id    userprofile.id%type;
        order_id               orders.id%type;
        good_id                goods.id%type;
        start_deliverylocation orders.deliverylocationid%type;
        unprocessed_status     orders.status%type    := 'unprocessed';
        userlocation_id        points.id%type;
        order_name             orders.ordername%type := 'order';

        no_such_profile_exception exception;
        pragma exception_init (no_such_profile_exception, 100);
    begin
        select userprofile.id
        into customer_profile_id
        from userprofile
                 join userlogin
                      on userprofile.userloginid = userlogin.id
        where userlogin.login = customer_login;

        select userprofile.id
        into executor_profile_id
        from userprofile
                 join userlogin
                      on userprofile.userloginid = userlogin.id
        where userlogin.login = 'executor';

        select userprofile.userpointid
        into userlocation_id
        from userprofile
        where userprofile.id = customer_profile_id;


        if get_delivery_type = 'courier' then
            select points.id
            into start_deliverylocation
            from points
            where points.type = 'staff' fetch first 1 rows only;
            insert into orders (customerprofileid, excecutorprofileid, deliverylocationid, status, userlocationid,
                                orderdate, deliverydate, deliverytype, price)
            values (customer_profile_id, executor_profile_id, start_deliverylocation, unprocessed_status,
                    userlocation_id,
                    get_data_order, get_delivery_date, get_delivery_type, get_order_price)
            returning id into order_id;
        else
            select points.id
            into start_deliverylocation
            from points
            where points.type = 'staff'
              and points.point_name = get_delivery_point_pickup;
            unprocessed_status := 'processed';
            insert into orders (customerprofileid, excecutorprofileid, deliverylocationid, status, userlocationid,
                                orderdate, deliverydate, deliverytype, price)
            values (customer_profile_id, executor_profile_id, start_deliverylocation, unprocessed_status,
                    userlocation_id,
                    get_data_order, get_delivery_date, get_delivery_type, get_order_price)
            returning id into order_id;
        end if;

        order_name := 'order_' || order_id;
        update orders set ORDERNAME= order_name where orders.id = order_id;
        commit;

        select goods.id into good_id from goods where goods.name = good_name;
        --user_package.add_history(order_id, customer_login, order_name, unprocessed_status);
        admin_package.add_goods_to_order(order_id, good_id);
        return order_name;
    exception
        when no_such_profile_exception then
            rollback;
            raise_application_error(-20003, 'Such profile does not exist');
        when dup_val_on_index then rollback;
        raise_application_error(-20002, 'Such order already exist');
        when others then
            rollback;
            raise_application_error(-20001, sqlerrm);
    end add_order;


--get orders by login
    function get_orders_not_executed_by_login(user_login userlogin.login%type) return sys_refcursor
        is
        orders_cursor sys_refcursor;
    begin
        open orders_cursor for select *
                               from orders_not_executed_view
                               where orders_not_executed_view.customer_login = user_login
                                 and orders_not_executed_view.order_status != 'executed';
        return orders_cursor;
    end get_orders_not_executed_by_login;

--add history
    procedure add_history(order_id orders.id%type,
                          customer_login userlogin.login%type,
                          order_name orders.ordername%type,
                          order_status orders.status%type)
        is
        customer_profile_id userprofile.id%type;
    begin
        select userprofile.id
        into customer_profile_id
        from userprofile
                 join USERLOGIN
                      on userprofile.userloginid = userlogin.id
        where userlogin.login = customer_login;

        insert into history(orderid)
        values (order_id);
        commit;
    end add_history;

--get customer history
    function get_history_by_login(customer_login userlogin.login%type) return sys_refcursor
        is
        history_cursor sys_refcursor;
    begin
        open history_cursor for select *
                                from history_view
                                where history_view.user_login = customer_login;
        return history_cursor;
    end get_history_by_login;

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
        open cursor_good for select * from goods where goods.name = good_name;
        return cursor_good;
    exception
        when no_data_found then raise_application_error(-20001, 'Such good does not exist');
    end;

--delete order by id
    procedure delete_order_by_name(order_name orders.ordername%type)
        is
        order_id orders.id%type;
    begin
        select orders.id into order_id from orders where orders.ORDERNAME = order_name;
        delete from orders where orders.ordername = order_name;
        commit;
    exception
        when no_data_found then raise_application_error(-20001, 'Such order does not exist');
    end delete_order_by_name;

--add review
    procedure add_review(get_content reviews.content%type, get_estimation reviews.estimation%type,
                         get_login userlogin.login%type)
        is
        userprofile_id userprofile.id%type;

    begin
        select userprofile.id
        into userprofile_id
        from userprofile
                 join userlogin
                      on userprofile.userloginid = userlogin.id
        where userlogin.login = get_login;

        insert into reviews (content, estimation, userprofileid)
        values (get_content, get_estimation, userprofile_id);
        commit;
    exception
        when no_data_found then
            rollback;
            raise_application_error(-20002, 'Such profile does not exist');
        when others then
            rollback;
            raise_application_error(-20001, sqlerrm);
    end add_review;
end user_package;
