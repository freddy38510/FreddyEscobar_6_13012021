const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSauce = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    name: Joi.string(),
    manufacturer: Joi.string(),
    description: Joi.string(),
    mainPepper: Joi.string(),
    heat: Joi.number().integer().min(1).max(10),
    imageUrl: Joi.string().uri(),
  }).options({ presence: 'required' }),
};

const getSauces = {};

const getSauce = {
  params: Joi.object().keys({
    sauceId: Joi.string().custom(objectId),
  }),
};

const updateSauce = {
  params: Joi.object().keys({
    sauceId: Joi.string().custom(objectId),
  }),

  body: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    name: Joi.string(),
    manufacturer: Joi.string(),
    description: Joi.string(),
    mainPepper: Joi.string(),
    heat: Joi.number().integer().min(1).max(10),
    imageUrl: Joi.string().uri(),
  }).min(1),
};

const deleteSauce = {
  params: Joi.object().keys({
    sauceId: Joi.string().custom(objectId),
  }),
};

const likeSauce = {
  params: Joi.object().keys({
    sauceId: Joi.string().custom(objectId),
  }),

  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    like: Joi.number().integer().min(-1).max(1)
      .required(),
  }),
};

module.exports = {
  createSauce,
  getSauces,
  getSauce,
  updateSauce,
  deleteSauce,
  likeSauce,
};
