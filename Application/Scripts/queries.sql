delete from userlogin;
delete from userprofile;
delete from deliverypoints;
delete from userpoints;
delete from goods;
delete  from goodstoorder;
delete  from history;
delete  from links;
delete  from roads;
delete  from shapes;
delete  from reviews;
delete  from orders;
commit;
rollback;
--select
select * from userlogin;
select * from userprofile;
select * from deliverypoints;
select * from userpoints;
select * from goods;
select *  from goodstoorder;
select *  from history;
select *  from links;
select *  from roads;
select *  from shapes;
select *  from reviews;
select *  from orders;

select * from user_sdo_geom_metadata;
select
index_name, status, DOMIDX_OPSTATUS
from all_indexes
where owner = 'ADMIN';

