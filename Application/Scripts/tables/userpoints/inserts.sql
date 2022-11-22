select * from userpoints;
insert into USERPOINTS (STREET, HOUSE, LOCATION, USERPROFILEID)
values ( 'Беларуская ','21',
        MDSYS.SDO_GEOMETRY(2001,
                          4326,
                          MDSYS.SDO_POINT_TYPE(53.88919185983302, 27.564432754093655, NULL),
                          NULL,
                          NULL),
        'EDFAC68166D103A7E053020014AC8410');
commit;

