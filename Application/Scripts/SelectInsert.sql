insert into UserLogin (LOGIN, PASSWORD, ROLE) values ('user1', 'pass1','user');
select * from UserLogin;
commit;

--insert into deliverypoints
insert into DELIVERYPOINTS (NAME,STREET, HOUSE, LOCATION)
values ('ServiceDelivery', '������������� ', '24',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.908069,27.527376, NULL),
                          NULL,
                          NULL));

insert into DELIVERYPOINTS (NAME,STREET, HOUSE, LOCATION)
values ('ServiceDelivery', '���������  ', '15',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE( 53.896548,27.547779 , NULL),
                          NULL,
                          NULL));

insert into DELIVERYPOINTS (NAME,STREET, HOUSE, LOCATION)
values ('ServiceDelivery', '�����', '20',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.900108,27.558122 , NULL),
                          NULL,
                          NULL));

insert into DELIVERYPOINTS (NAME,STREET, HOUSE, LOCATION)
values ('ServiceDelivery', '������������� ', '23',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.901209,27.559900 , NULL),
                          NULL,
                          NULL));

insert into DELIVERYPOINTS (NAME,STREET, HOUSE, LOCATION)
values ('ServiceDelivery', '�������� ������� ', '5',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.897469,27.600814 , NULL),
                          NULL,
                          NULL));

insert into DELIVERYPOINTS (NAME,STREET, HOUSE, LOCATION)
values ('ServiceDelivery', '������������','2',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.891359,27.607400 , NULL),
                          NULL,
                          NULL));

insert into DELIVERYPOINTS (NAME,STREET, HOUSE, LOCATION)
values ('ServiceDelivery', '�������������� ����� ', '93',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.934312,27.539824 , NULL),
                          NULL,
                          NULL));

insert into DELIVERYPOINTS (NAME,STREET, HOUSE, LOCATION)
values ('ServiceDelivery', '����������','74',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.926873,27.509787 , NULL),
                          NULL,
                          NULL));

insert into DELIVERYPOINTS (NAME,STREET, HOUSE, LOCATION)
values ('ServiceDelivery', '����������� ','24',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.921516,27.499191 , NULL),
                          NULL,
                          NULL));

insert into DELIVERYPOINTS (NAME,STREET, HOUSE, LOCATION)
values ('ServiceDelivery', '����� ������ ','5',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.921263,27.483248, NULL),
                          NULL,
                          NULL));
commit;

delete from DELIVERYPOINTS;
select * from DELIVERYPOINTS;

