select *  from user_tables;
---drop tables---
drop table UserLogin;
drop table UserProfile;
drop table Goods;
drop table Reviews;

drop table Orders;
drop table GoodsToOrder;
drop table DeliveryPoints;
drop table UserPoints;
drop table Links;
drop table History;
---drop tables---
CREATE TABLE UserLogin(
    ID RAW(32) DEFAULT SYS_GUID(),
    LOGIN NVARCHAR2(20) default null,
    PASSWORD NVARCHAR2(200) default null,
    ROLE NVARCHAR2(5) default 'user',
    CONSTRAINT PK_USERLOGIN_ID PRIMARY KEY(ID),
    CONSTRAINT CHECK_USERLOGIN_ROLE CHECK(ROLE like 'admin' OR ROLE like 'user' OR ROLE like 'staff')
);

CREATE TABLE UserProfile(
    ID RAW(32) DEFAULT SYS_GUID(),
    EMAIL NVARCHAR2(50) default null,
    USERLOGINID RAW(32) DEFAULT SYS_GUID(),
    CONSTRAINT PK_USERPROFILE_ID primary key(ID),
    CONSTRAINT FK_USERPROFILE_USERLOGINID foreign key(USERLOGINID) references UserLogin(ID)
);

CREATE TABLE Goods(
    ID RAW(32) DEFAULT SYS_GUID(),
    NAME NVARCHAR2(20),
    DESCRIPTION NVARCHAR2(300) default null,
    PRICE NUMBER (5,2),
    CONSTRAINT PK_GOODS_ID primary key(ID)
);

CREATE TABLE Reviews(
    ID RAW(32) DEFAULT SYS_GUID(),
    CONTENT NVARCHAR2(300) default 'Goood!',
    ESTIMATION NUMBER,
    USERPROFILEID RAW(32) DEFAULT SYS_GUID(),
    CONSTRAINT PK_REVIEWS_ID primary key (ID),
    CONSTRAINT FK_REVIEWS_USERPROFILEID foreign key(USERPROFILEID) references UserProfile(ID)
);

create index DeliveryPoints_SP_Index on DeliveryPoints(LOCATION)
  indextype is mdsys.spatial_index;

CREATE TABLE DeliveryPoints(
    ID RAW(32) DEFAULT SYS_GUID(),
    NAME NVARCHAR2(50) not null,
    LOCATION SDO_GEOMETRY,
    CONSTRAINT PK_DELIVERYPOINTS_ID primary key (ID)
);

create index DeliveryPoints_SP_Index on DeliveryPoints(LOCATION)
  indextype is mdsys.spatial_index; --сбой при чтении
drop index DeliveryPoints_SP_Index;

CREATE TABLE UserPoints(
    ID RAW(32) DEFAULT SYS_GUID(),
    USERPROFILEID RAW(32) DEFAULT SYS_GUID(),
    LOCATION SDO_GEOMETRY,
    CONSTRAINT PK_USERPOINTS_ID primary key (ID),
    CONSTRAINT FK_USERPOINTS_USERPROFILEID foreign key (USERPROFILEID) references UserProfile(ID)
);

CREATE TABLE Links(
    ID RAW(32) DEFAULT SYS_GUID(),
    STARTPOINTID RAW(32) DEFAULT SYS_GUID(),
    ENDPOINTID RAW(32) DEFAULT SYS_GUID(),
    CONSTRAINT PK_LINKS_ID primary key (ID),
    CONSTRAINT FK_LINKS_ENDPOINTID foreign key (ENDPOINTID) references DeliveryPoints(ID),
    CONSTRAINT FK_LINKS_STARTPOINTID foreign key (STARTPOINTID) references UserPoints(ID)
);

CREATE TABLE GoodsToOrder(
    ORDERID RAW(32) DEFAULT SYS_GUID(),
    GOODSID RAW(32) DEFAULT SYS_GUID(),
    CONSTRAINT FK_GOODSTOORDER_ORDERID foreign key (ORDERID) references Orders(ID),
    CONSTRAINT FK_GOODSTOORDER_GOODSID foreign key (GOODSID) references Goods(ID)
);

CREATE TABLE Orders(
    ID RAW(32) DEFAULT SYS_GUID(),
    CUSTOMERPROFILEID RAW(32) DEFAULT SYS_GUID() NOT NULL,
    EXCECUTORPROFILEID RAW(32) DEFAULT SYS_GUID() null,
    DataOrder DATE,
    STATUS NVARCHAR2(10), --TODO: THINK WHAT STATUS TYPE WILL BE
    USERLOCATIONID RAW(32) default SYS_GUID(),
    DELIVERYLOCATIONID RAW(32) default SYS_GUID(),
    ORDERDATE DATE,
    DELIVERYDATE DATE,
    CONSTRAINT PK_ORDERS_ID primary key(ID),
    CONSTRAINT FK_ORDERS_CUSTOMERPROFILEID foreign key (CUSTOMERPROFILEID) references UserProfile(ID),
    CONSTRAINT FK_ORDERS_EXCECUTORPROFILEID foreign key (EXCECUTORPROFILEID) references UserProfile(ID),
    CONSTRAINT FK_ORDERS_USERLCATIONID foreign key (USERLOCATIONID) references UserPoints(ID),
    CONSTRAINT FK_ORDERS_DELIVERYLOCATIONID foreign key (DELIVERYLOCATIONID) references DeliveryPoints(ID)
);

CREATE TABLE History(
    ID RAW(32) DEFAULT SYS_GUID(),
    ORDERID RAW(32) DEFAULT SYS_GUID(),
    CONSTRAINT PK_HISTORY_ID primary key (ID),
    CONSTRAINT FK_HISTORY_ORDERID foreign key (ORDERID) references Orders(ID)
);

alter table deliverypoints add STREET nvarchar2(50);
alter table deliverypoints add HOUSE number;
