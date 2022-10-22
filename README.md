# Warehouse

Hello and welcome to my project. It consists on a monorepo to access 
and modify products and inventories. 

## Getting started

#### System requirements

💡 The setup described here will involve <a href="https://www.docker.com//">Docker</a>. In order to follow this guide you'll need the service up and running on your system. You can find how to install it <a href="https://docs.docker.com/engine/install/"> here</a>.

⚠️ Make sure you are in the repos root directory before you start the setup.

#### Features

The application relies on three containers running each service:
  - A [PostgreSQL](https://www.postgresql.org/) database.
  - The API served with [Express](https://expressjs.com/).
  - [React](https://reactjs.org/) web application 

## Setting up the project

- #### General

    First of all, we will create a docker network[^1] to allow the containers to communicate with each other:

    ```bash
    # Creation of Docker network named `warehouse`
    docker network create --gateway=172.21.0.1 --subnet=172.21.0.0/16 warehouse

    # The network should when listed
    docker network list
    ```

- #### Database

  - ##### Building the image

    ```bash
    docker build --no-cache . -f db.Dockerfile -t warehousedb
    ```
  - ##### Running the container

    ```bash
    # Note the IPv4 assignment for the API server database configuration parameters
    docker run -d -p 5432:5432 --network warehouse --ip 172.21.0.10 --name warehousedb warehousedb
    ```

  - ##### Access to the psql command line tool

    ```bash
    # You might want to check that the database initialised correctly
    docker exec -it warehousedb psql -U warehouse     
    ...
    warehouse=# \l
    warehouse=# \d
    warehouse=# SELECT * FROM articles;
    warehouse=# SELECT * FROM products;
    ...
    # To close the connection just type 'exit' and press `Enter`
    warehouse=# exit
    ```

- #### API

  - ##### Building the image
    ```bash
    docker build --no-cache . -f api.Dockerfile -t warehouseapi
    ```
  - ##### Running the container
    ```bash
    # Note two things:
    #  - the use of a volume to apply local changes to the container
    #  - the IPv4 assignment for the React client requests to the API
    docker run -v "$(pwd)/warehouse-api/src:/warehouse-api/src" -d -p 3000:3000 --network warehouse --ip 172.21.0.11 --name warehouseapi warehouseapi
    ```

  - ##### Testing the API
    You'll be able to access the [Swagger](https://swagger.io/) API docs [here](http://localhost:3000/warehouse/api/docs/)

- #### 🚧 Web application [^2]
    
    ```
    Setup and details about the React application
    ```



[^1]: Docker network definition and details from its [official website](https://docs.docker.com/engine/reference/commandline/network/)
[^2]: Coming [soon™](https://wowwiki-archive.fandom.com/wiki/Soon#:~:text=the%20Earth's%20orbit!%22-,Blizzard's%20Official%20Definition%20of%20Soon,number%20of%20risks%20and%20uncertainties.)