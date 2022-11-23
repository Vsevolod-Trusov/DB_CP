ALTER SESSION SET "_ORACLE_SCRIPT"= true;
--for check
select username from user_users;
select * from user_tablespaces;
select * from user_tables;
--creating pluggable database
CREATE PLUGGABLE DATABASE COURSE_PDB ADMIN USER admin IDENTIFIED BY qwerty
    STORAGE (MAXSIZE 4 G)
    DEFAULT TABLESPACE COURSE_TS
        DATAFILE '/course_ts/cts.dbf' SIZE 100 M AUTOEXTEND ON
    PATH_PREFIX = '/course_ts/'
    FILE_NAME_CONVERT = ('pdbseed',
        'course_ts');
select name, open_mode
from v$pdbs;

--creating permanent, temporary tablespace
CREATE TABLESPACE COURSE_TS DATAFILE 'cts.dbf' SIZE 100 M AUTOEXTEND ON NEXT 100 M
    BLOCKSIZE 8192
    LOGGING
    ONLINE
    SEGMENT SPACE MANAGEMENT AUTO;

CREATE TEMPORARY TABLESPACE COURSE_TS_TEMP
    TEMPFILE 'ctemp.dbf' SIZE 50M
    AUTOEXTEND ON NEXT 10M;

DROP TABLESPACE COURSE_TS_TEMP INCLUDING CONTENTS AND DATAFILES;
--creating role, profile and connecting with admin-user
CREATE ROLE ADMIN_ROLE;

GRANT
    CREATE SESSION,
    CREATE TABLE,
    CREATE VIEW,
    CREATE PROCEDURE,
    CREATE PROFILE,
    CREATE USER,
    DROP USER,
    CREATE ROLE,
    DROP PROFILE,
    CREATE ANY INDEX,
    CREATE ANY SEQUENCE
TO ADMIN_ROLE WITH ADMIN OPTION;

CREATE PROFILE ADMIN_PROFILE LIMIT
    PASSWORD_LIFE_TIME 180
    SESSIONS_PER_USER 10
    FAILED_LOGIN_ATTEMPTS 7
    PASSWORD_LOCK_TIME 1
    PASSWORD_REUSE_TIME 10
    PASSWORD_GRACE_TIME DEFAULT
    CONNECT_TIME 180
    IDLE_TIME 30;

alter profile ADMIN_PROFILE LIMIT SESSIONS_PER_USER 10;

ALTER USER admin PROFILE ADMIN_PROFILE;
ALTER USER admin DEFAULT TABLESPACE COURSE_TS QUOTA UNLIMITED ON COURSE_TS;
ALTER USER admin TEMPORARY TABLESPACE COURSE_TS_TEMP;

GRANT ADMIN_ROLE TO ADMIN;
create table test(id number);
insert into test values(1);
commit;
select * from test;
DROP TABLE test;
commit;