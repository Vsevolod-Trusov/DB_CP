--test get executors by point name
declare
    executors_cursor sys_refcursor;
    login userlogin.login%type;
    counter_orders number;
    begin
    executors_cursor := admin_package.get_executors_by_point_name('Ленина 20');
    loop
        fetch executors_cursor into login,counter_orders;
        exit when executors_cursor%notfound;
        dbms_output.put_line(login||''||counter_orders);
    end loop;
end;

--test register
begin
    admin_package.register_user('asd', 'Ленина 20', 'qwerty', 'admin', 'asd');
end;
begin
    admin_package.register_user('executor', 'Ленина 20', 'qwerty', 'staff', 'admin');
end;
begin
    admin_package.register_user('test_executor', 'Ленина 20', 'qwerty', 'staff', 'test_executor');
end;
begin
    admin_package.register_user('user', 'Беларуская 21', 'qwerty', 'user', 'user');
end;
select *
from USERLOGIN;
select *
from userprofile;

--test auth
declare
    auth_success sys_refcursor;
begin
    auth_success := admin_package.authorisation('admin_test', 'qwerty');
end;
--test encription
declare
    hash1 userlogin.password%type;
    hash2 userlogin.password%type;
    bol   boolean;
begin
    hash1 := admin_package.encrypt_password('qwerty');
    hash2 := admin_package.encrypt_password('qwerty');
    bol := hash1 = hash2;
    if bol = true then
        dbms_output.PUT_line('true');
    else
        dbms_output.PUT_line('false');
    end if;
end;

--test add good
begin
    admin_package.add_good('pan', 'for 2 days', 5.25);
end;
--test delete good
begin
    admin_package.DELETE_GOOD_BY_NAME('asdfg');
end;
select *
from goods;

--test update order executor and deliverypoint
begin
    admin_package.UPDATE_ORDER_EXECUTOR_DELIVERYPOINT('order_EE33B9FA7C2B0172E053020014AC42AD',
        'test_executor', 'Ленина 20');
end;

--test get unprocessed orders
declare
    test_cursor sys_refcursor;
begin
    test_cursor := admin_package.GET_UNPROCESSED_ORDERS();
end;


/*SELECT SDO_GCDR.GEOCODE_AS_GEOMETRY('ADMIN',
SDO_KEYWORDARRAY('1 Carlton B Goodlett Pl', 'San Francisco, CA  94102'),
'US') FROM DUAL;*/