# orderOnWheels

**Summary** 

App that creates, lists, and books orders for a van

## Overview

App that serves three api endpoints for Van Orders
1. Create
2. Update
3. List

## Config Variables setup

1. go to the folder : `./config/environment`
2. To setup config variables for development: use file `development.js`
3. to setup config variables for production: user file `production.js`
4. You will need to put put config variables for google maps key, and the mysql database. 

## Installation

To install locally:
1. `npm install`
2. `npm i -g sequelize-cli`

## Basic use

To intialize the db use: 
1. `sequelize db:create`
2. `sequelize db:migrate`

After installation, run 
1. `npm run start`

To run with nodemon for local development, use
1. `npm run start-dev`

To run in productions, use
1. `npm run start-prod`

## To run with docker
1. Setup config variables in `./config/environment/production.js`
2. Build image for app using `docker build -t <dockerUserID>/node-web-app .`
3. run `docker-compose up` to compose docker
4. on a seperate terminal window 
    run `docker exec -it orderonwheels_db mysql -uroot -p123123123` to access mysql within the container
    Use the following to grant access:
    ```
       mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123123123';
       mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123123123';
       mysql> exit
    ```
5. use Ctrl+c to stop docker compose. Re-compose docker using `docker-compose up`
6. it will run `start.sh` which will migrate the db to create the required tables. 

## API Samples

1. Install Postman from `https://www.getpostman.com/downloads/`
2. Import collection into postman
3. Collection json file is avaliable at `./OrderOnWheels.postman_collection.json`

## Tests

To run the tests, use
1. `npm run test`
