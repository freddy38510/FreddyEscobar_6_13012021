const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, secret = config.jwt.secret) => {
  const payload = {
    userId,
  };

  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

/**
 * Verify token and return token payload
 * @param {string} token
 * @returns {<Token>}
 */
const verifyToken = (token) => jwt.verify(token, config.jwt.secret);

module.exports = {
  generateToken,
  verifyToken,
};
