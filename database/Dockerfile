FROM postgres:alpine3.14

# Initialize the database
ADD scripts/1_init.sql /docker-entrypoint-initdb.d

# Add test data if needed
# ADD scripts/2_copy.sql /docker-entrypoint-initdb.d

RUN chmod a+r /docker-entrypoint-initdb.d/*