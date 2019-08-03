# orderOnWheels

**Badges** 

Optional badges such as npm version, test and build coverage, and so on.

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
4. it will run `start.sh` which will migrate the db to create the required tables. 

## API Samples

1. Install Postman from `https://www.getpostman.com/downloads/`
2. Import collection into postman
3. Collection json file is avaliable at `./OrderOnWheels.postman_collection.json`

## Tests

To run the tests, use
1. `npm run test`