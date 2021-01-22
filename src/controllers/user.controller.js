const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  await userService.createUser(req.body);

  res.status(httpStatus.CREATED).send({ message: 'User created' });
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.queryUsers();

  res.send(users);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId).orFail();

  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  await userService.updateUserById(req.params.userId, req.body, req.user);

  res.send({ message: 'User updated' });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId, req.user);

  res.send({ message: 'User deleted' });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
