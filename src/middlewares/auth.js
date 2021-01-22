const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const extractBearerToken = require('../utils/extractBearerToken');
const { tokenService } = require('../services');

const auth = async (req, _res, next) => {
  try {
    const token = extractBearerToken(req.headers.authorization);

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }

    const decodedToken = tokenService.verifyToken(token);

    req.user = { id: decodedToken.userId };

    // check if authenticated user is resource owner when updating
    if (req.body.userId && req.body.userId !== req.user.id) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = auth;
