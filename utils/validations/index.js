const isString = require('lodash/isString');
const isInteger = require('lodash/isInteger');
const isNull = require('lodash/isNull');

const validateCoordinateLength = (coordinateArr) => {
  if (isNull(coordinateArr)) {
    throw new HttpError(400, 'Coordinates missing');
  } else if (coordinateArr.length != 2) {
    throw new HttpError(400, 'Coordinate has to be an array of exactly two strings');
  }
}

const validateCoordinateType = (coordinateValue) => {
  if(!isString(coordinateValue)) {
    throw new HttpError(400, 'All Coordinates must be strings');
  }
}

const validateCoordinate = async (coordinate) => {
  validateCoordinateLength(coordinate);
  coordinate.map(c => {
    validateCoordinateType(c);
  })
} 

const validatePage = (page) => {
  if (!page) throw new HttpError(400, 'Page Missing')
  else if (!isInteger(parseInt(page))) throw new HttpError(400, 'Page should be Integer');
  // TODO: 1.2 is passing as page
}

const validateLimit = (limit) => {
  if (!limit) throw new HttpError(400, 'Limit Missing')
  else if (!isInteger(parseInt(limit))) throw new HttpError(400, 'Limit should be Integer');
  // TODO: 1.2 is passing as page
}

module.exports = {
  validateCoordinate,
  validateLimit,
  validatePage,
}