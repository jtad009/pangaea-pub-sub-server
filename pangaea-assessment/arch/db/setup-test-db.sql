CREATE USER pangea_test WITH PASSWORD 'test';

CREATE DATABASE pangea_test
    WITH
    OWNER = pangea_test
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
