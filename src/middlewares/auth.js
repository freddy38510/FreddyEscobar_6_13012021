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

    const { userId } = decodedToken;

    // check if authenticated user is resource owner when updating or deleting
    if (req.body.userId && req.body.userId !== userId) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = auth;
