FROM postgres:alpine3.14

# Adding scripts for initializing the database to the entrypoint
ADD scripts/0_import.sql /docker-entrypoint-initdb.d
ADD scripts/1_init.sql /docker-entrypoint-initdb.d
ADD scripts/2_copy.sql /docker-entrypoint-initdb.d

# Adding files to import data from
ADD data/* /

RUN chmod a+r /docker-entrypoint-initdb.d/*