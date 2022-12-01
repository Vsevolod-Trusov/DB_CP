--admin package
select *
from userprofile
         join userlogin on userprofile.userloginid = userlogin.id;

--get_executors_by_point_name
select login,
       (select count(*)
        from orders
                 join userprofile on ORDERS.EXCECUTORPROFILEID = USERPROFILE.ID
                 join userlogin ul1
                      on ul1.id = userprofile.USERLOGINID
        where ul1.login != 'executor'
          and ul1.id = ul2.id) as orders_count
from userlogin ul2
         join userprofile on ul2.id = userprofile.userloginid
where ul2.role = 'staff'
  and USERPROFILE.USERPOINTID = 'EE248EE88B480354E053020014AC2BAA'
  and ul2.login != 'executor';

--get_unprocessed_orders
select o1.ordername          as order_name,
       o1.orderdate          as order_date,
       o1.deliverydate       as delivery_date,
       o1.status             as order_status,
       o1.price              as order_price,
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

--end

--staff package

--get_processed_order_to_staff_by_login
select o1.ordername          as order_name,
       o1.orderdate          as order_date,
       o1.deliverydate       as delivery_date,
       o1.price              as order_price,
       o1.DELIVERYTYPE       as delivery_type,
       o1.status             as order_status,
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
where o1.status = 'processed'
  and userlogin.login = 'bob';

--get_reviews
select content, estimation, userlogin.login as login
from reviews
         join userprofile
              on reviews.userprofileid = userprofile.id
         join USERLOGIN
              on userprofile.userloginid = userlogin.id;

--end

--user package
--get_history_by_login
select g.name         as name,
       h.status       as status,
       o.orderdate    as order_date,
       o.deliverydate as delivery_date
from orders o
         join history h on h.orderid = o.id
         join userprofile u on o.customerprofileid = u.id
         join userlogin ul on u.userloginid = ul.id
         join goodstoorder gto on o.id = gto.orderid
         join goods g on gto.goodsid = g.id
where ul.login = 'user';
--end