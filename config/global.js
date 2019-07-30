const _ = require('lodash');

require('./environment');

const { models, sequelize } = require('./sequelize')();
const { HttpError } = require('../service/error');

module.exports = () => {
  global._ = _;
  global.DB = models;
  global.sequelize = sequelize;
  global.HttpError = HttpError;
  const globalVars = {
    _,
    DB: models,
    sequelize,
    HttpError,
  }
  return globalVars;
};
