const express = require("express");
const bodyParser = require("body-parser");

require('./config/global')();
const configApi = require('./api');
const configSequelize = require('./config/sequelize');
const errorService = require('./service/error');

const app = express();
const server = require('http').createServer(app);
app.use(bodyParser.json());

configSequelize();
configApi(app);
app.use(errorService.middleware);
server.listen(8080, () => {
  console.log("Server listening on port 8080!");
});

module.exports = app;
