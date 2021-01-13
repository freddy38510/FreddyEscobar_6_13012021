const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService, userService, tokenService,
} = require('../services');

const register = catchAsync(async (req, res) => {
  await userService.createUser(req.body);

  res.status(httpStatus.CREATED).send({ message: 'User created' });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password);

  const token = tokenService.generateToken(user.id);

  res.send({ userId: user.id, token });
});

module.exports = {
  register,
  login,
};
