const { User } = require('../models');
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => User.create(userBody);

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async () => User.find();

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => User.findById(id);

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => User.findOne({ email });

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody, authUser) => {
  const user = await getUserById(userId).orFail();

  if (user.id !== authUser.id) {
    throw new Error('Unauthorized');
  }

  Object.assign(user, updateBody);

  await user.save();

  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId, authUser) => {
  const user = await User.findById(userId).orFail();

  if (user.id !== authUser.id) {
    throw new Error('Unauthorized');
  }

  await user.remove();

  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
