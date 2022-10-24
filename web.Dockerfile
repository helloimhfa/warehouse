# Build construction
FROM node:18.11.0-alpine3.16
RUN mkdir /warehouse-web
WORKDIR /warehouse-web
COPY ./warehouse-web/package*.json ./
RUN npm i
COPY ./warehouse-web .
EXPOSE 3100
CMD [ "npm", "run", "start" ]