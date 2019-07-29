const isNil = require('lodash/isNil');
const omitBy = require('lodash/omitBy');
const toInteger = require('lodash/toInteger');

const getPagination = (page, limit) => {
  const offset = (page-1)*limit;
  return omitBy({
    limit: toInteger(limit),
    offset: toInteger(offset),
  }, isNil);
};

// can add other functions here 
// eg. getRange, getSearchQuery, getWhereStatement 
// which can be user by all controllers

module.exports = {
  getPagination,
};
