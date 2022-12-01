create or replace trigger add_in_history_table_after_adding_in_orders_trigger after insert
    or update on orders
    for each row
begin
  if inserting then
    insert into HISTORY(orderid, userprofileid, ordername, status) VALUES (:new.id, :new.customerprofileid, :new.ordername, :new.status);
  elsif updating then
      update HISTORY set HISTORY.status = :new.status;
    end if;
end add_in_history_table_after_adding_in_orders_trigger;

