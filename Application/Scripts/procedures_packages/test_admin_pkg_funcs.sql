--test register
begin
    admin_package.register_user('admin','Ленина 20', 'qwerty', 'admin', 'admin');
end;
begin
    admin_package.register_user('executor','Ленина 20', 'qwerty', 'staff', 'admin');
end;
begin
    admin_package.register_user('user','Беларуская 21', 'qwerty', 'user', 'user');
end;
select * from USERLOGIN;
select * from userprofile;

--test auth
declare
    auth_success boolean;
begin
    auth_success := admin_package.authorisation('admin_test', 'qwerty');
    if auth_success then
        dbms_output.put_line('exists');
    else
        dbms_output.put_line('not exist');
    end if;
end;
--test encription
declare
    hash1 userlogin.password%type;
    hash2 userlogin.password%type;
    bol boolean;
begin
    hash1 :=admin_package.encrypt_password('qwerty');
    hash2 :=admin_package.encrypt_password('qwerty');
    bol := hash1 = hash2;
    if bol=true then
            dbms_output.PUT_line('true');
    else
            dbms_output.PUT_line('false');
    end if;
end;

--test add good
    begin
    admin_package.add_good('pan', 'for 2 days', 5.25);
    end;
    select * from goods;

--test change order executor and delivery location
declare
    order_id orders.id%type := 'EDFD8BA561310525E053020014AC586C';
    executor_id orders.excecutorprofileid%type := 'EDFAC68166D503A7E053020014AC8410';
    deliverylocation_id orders.deliverylocationid%type := 'EDCE6214C76E01C0E053020014AC8F91';

begin
admin_package.change_executor_and_delivery_point(order_id, executor_id, deliverylocation_id);
end;

   /*SELECT SDO_GCDR.GEOCODE_AS_GEOMETRY('ADMIN',
  SDO_KEYWORDARRAY('1 Carlton B Goodlett Pl', 'San Francisco, CA  94102'),
  'US') FROM DUAL;*/