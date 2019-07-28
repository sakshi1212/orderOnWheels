const _ = require('lodash');

require('./environment');

const { models, sequelize } = require('./sequelize')();

module.exports = () => {
  global._ = _;
  global.DB = models;
  global.sequelize = sequelize;
};
