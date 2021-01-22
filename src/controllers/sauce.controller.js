const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { sauceService } = require('../services');

const createSauce = catchAsync(async (req, res) => {
  await sauceService.createSauce(req.body);

  res.status(httpStatus.CREATED).send({ message: 'Sauce created' });
});

const getSauces = catchAsync(async (_req, res) => {
  const sauces = await sauceService.querySauces();

  res.send(sauces);
});

const getSauce = catchAsync(async (req, res) => {
  const sauce = await sauceService.getSauceById(req.params.sauceId);

  res.send(sauce);
});

const updateSauce = catchAsync(async (req, res) => {
  await sauceService.updateSauceById(req.params.sauceId, req.body, req.user);

  res.send({ message: 'Sauce updated' });
});

const deleteSauce = catchAsync(async (req, res) => {
  await sauceService.deleteSauceById(req.params.sauceId, req.user);

  // frontend wants a 200 http code
  // res.status(httpStatus.NO_CONTENT).send();
  res.send({ message: 'Sauce deleted' });
});

const likeSauce = catchAsync(async (req, res) => {
  await sauceService.likeSauceById(req.params.sauceId, req.body);

  res.send({ message: 'Sauce liked' });
});

module.exports = {
  createSauce,
  getSauces,
  getSauce,
  updateSauce,
  deleteSauce,
  likeSauce,
};
