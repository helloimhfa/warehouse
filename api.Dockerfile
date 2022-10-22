# Image with Warehouse's API server
FROM node:18.11.0-alpine3.16
RUN mkdir /warehouse-api
WORKDIR /warehouse-api
COPY ./warehouse-api/package*.json ./
RUN npm i
COPY ./warehouse-api .
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]