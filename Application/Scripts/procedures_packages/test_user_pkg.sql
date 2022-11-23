--test add order
declare
    good_name goods.name%type;
    good_row goods%rowtype;
begin
    select goods.name into good_name from goods fetch first 1 rows only;

dbms_output.put_line(user_package.add_order(
    'user',
    good_name,
    '21.11.2022', '22.11.2022'));
end;--todo: протестировать

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

--test get goods
declare
    good sys_refcursor;
    row goods%rowtype;
begin
    good := USER_PACKAGE.GET_ALL_GOODS();
    fetch good into row;
    while good%found
    loop
        dbms_output.put_line(row.id);
        fetch good into row;
        end loop;
        end;

--test get good by is
declare
good_id goods.id%type := 'EE2246073F5B0196E053020014AC2625';
    get_good goods%rowtype;
    begin
    get_good := USER_PACKAGE.GET_GOOD_BY_ID('EE2246073F5B0196E053020014AC2625');
    DBMS_OUTPUT.PUT_LINE(get_good.NAME);
        end;

declare
    cur sys_refcursor;
good_id goods.id%type := 'EE2246073F5B0196E053020014AC2625';
    get_good goods%rowtype;
    begin
    cur := USER_PACKAGE.GET_GOOD_BY_ID( 'EE2246073F5B0196E053020014AC2625');
    --get_good := USER_PACKAGE.GET_GOOD_BY_ID(1234);
    fetch cur into get_good;
    DBMS_OUTPUT.PUT_LINE(get_good.NAME);
        end;


