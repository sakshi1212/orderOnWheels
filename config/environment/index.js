'use strict';

const path = require('path');
const _ = require('lodash');
const fs = require('fs');

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  try {
    fs.accessSync(path.normalize(`${__dirname}/default-env.js`), fs.F_OK);
    require('./default-env');
  } catch (e) {
    console.warn('You are in development, but default-env.js does not exist. Please set up default-env');
  }
}

let defaultConfig = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  mysql: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};

// merge defaultconfig with environment specific config
defaultConfig = _.merge(
  defaultConfig,
  require(`${__dirname}/${defaultConfig.env}.js`) || {} 
);

console.log(defaultConfig);

module.exports = defaultConfig;
