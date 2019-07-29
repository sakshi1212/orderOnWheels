/* eslint-disable prefer-destructuring, no-multi-assign */
const { ValidationError } = require('sequelize');

class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      return Error.captureStackTrace(this, this.constructor);
    }
    this.stack = (new Error(message)).stack;
  }
}

class HttpError extends ExtendableError {
  constructor(status = 500, message = 'Unknown Error') {
    super(message);

    if (status < 400) {
      console.warn(`HttpError created with status ${status}. HttpError should have an error status above 400.`);
    }

    this.status = this.code = status;
  }
}

const middleware = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const response = {
      error: err.message,
    };

    return res.status(422).send(response);
  }

  // non-http-error
  if (!(err instanceof HttpError)) {
    return next(err);
  }

  const response = {
    error: err.message,
  };

  return res.status(err.status).send(response);
};

module.exports = {
  HttpError,
  middleware,
};
