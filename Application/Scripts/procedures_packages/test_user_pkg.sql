--test add order
declare
    good_id goods.id%type;
    good_row goods%rowtype;
begin
    select * into good_row from goods fetch first 1 rows only;
    good_id := user_package.get_good_id(good_row.name,
        good_row.description, good_row.price);
dbms_output.put_line(user_package.add_order('vsevolod', good_id, '21.11.2022', '22.11.2022'));
end;

--test add and then delete order
declare
    good_id goods.id%type;
    good_row goods%rowtype;
    order_id orders.id%type;
begin
    select * into good_row from goods fetch first 1 rows only;
    good_id := user_package.get_good_id(good_row.name,
        good_row.description, good_row.price);
    order_id := user_package.add_order('vsevolod', good_id, '21.11.2022', '22.11.2022');
dbms_output.put_line(order_id);
    user_package.delete_order_by_id(order_id);
    end;

--test add review
declare
    estimation number := 9;
begin
    user_package.add_review('Very cool pen', estimation, 'vsevolod');
end;
