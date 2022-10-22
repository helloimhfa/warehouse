# Image with the Warehouse's Postgresql database
FROM postgres:alpine3.16
ENV POSTGRES_USER warehouse
ENV POSTGRES_PASSWORD warehouse
ENV POSTGRES_DB warehouse
# For additional database configuration:
# COPY ./warehouse-database/init.sql /docker-entrypoint-initdb.d/
