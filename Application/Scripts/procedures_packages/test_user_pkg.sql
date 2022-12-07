--test getting distance
declare
    distance number;
begin
    --distance := user_package.get_distance_between_deliverypoint_customer('Ленина 20', 'Беларуская 21');
    distance := user_package.get_distance_between_deliverypoint_customer('asdfgh', 'Беларуская 21');
    dbms_output.put_line(distance);
end;
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
end;
declare
    history sys_refcursor;
    good_name goods.name%type;
    order_date orders.ORDERDATE%type;
    delivery_date orders.DELIVERYDATE%type;
    status HISTORY.STATUS%type;
begin
    history:= user_package.GET_HISTORY_BY_LOGIN('user');
    fetch history into good_name;
    dbms_output.put_line(good_name);
    end;

begin
    user_package.ADD_HISTORY('EE2596160F4C0408E053020014AC37D9',
        'user',
        'order_EE2596160F4C0408E053020014AC37D9',
        'unprocessed');
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

declare
    userprofile_id userprofile.id%type;
     no_such_profile_exception exception;
        pragma exception_init (no_such_profile_exception, 100);
    begin
    select userprofile.id into userprofile_id from userprofile join userlogin on userprofile.USERLOGINID = userlogin.id
    where userlogin.login = '';
    exception when no_such_profile_exception then dbms_output.put_line('error');
end;

declare
    cur_goods sys_refcursor;
    name goods.name%type;
begin
    cur_goods := user_package.get_pagination_goods(1,6);
    fetch cur_goods into row;
    while good%found
    loop
        dbms_output.put_line(row.id);
        fetch good into row;
        end loop;
        end;
end;
