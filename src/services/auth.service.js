const userService = require('./user.service');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new Error('Incorrect email or password');
  }

  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
};
