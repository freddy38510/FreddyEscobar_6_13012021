const mongoose = require('mongoose');
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, _req, _res, next) => {
  if (err instanceof ApiError) {
    return next(err);
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return next(new ApiError(httpStatus.NOT_FOUND, 'Resource not found', true));
  }

  if (err instanceof mongoose.Error.ValidatorError
    || err instanceof mongoose.Error.ValidationError) {
    return next(new ApiError(httpStatus.BAD_REQUEST, err.message, true));
  }

  if (err.message === 'Incorrect email or password') {
    return next(new ApiError(httpStatus.UNAUTHORIZED, err.message, true));
  }

  if (err.message === 'Unauthorized') {
    return next(new ApiError(httpStatus.UNAUTHORIZED, err.message, false));
  }

  let error = err;

  const statusCode = error.statusCode || error instanceof mongoose.Error
    ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;

  const message = error.message || httpStatus[statusCode];

  error = new ApiError(statusCode, message, false, err.stack);

  return next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, next) => {
  let { statusCode, message } = err;

  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send({ message, status: statusCode });
};

module.exports = {
  errorConverter,
  errorHandler,
};
