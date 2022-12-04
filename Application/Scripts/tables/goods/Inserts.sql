insert into GOODS (name, description, price)
values ('pencil', 'for 3 days', 2.2);
commit;

--inserting into goods table
declare
    item_price number(5, 2) := 2.5;
begin
    for i in 1..100
        loop
            if mod(i,10)= 0 then
                item_price := item_price + 10.5;
            end if;
            insert into GOODS (name, description, price)
            values ('item' || i, 'description...', item_price);
        end loop;
    commit;
end;
delete from goods;
select * from GOODS;
