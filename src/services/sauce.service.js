const { Sauce } = require('../models');
const deleteSauceImage = require('../utils/deleteSauceImage');

/**
 * Create a sauce
 * @param {Object} sauceBody
 * @returns {Promise<Sauce>}
 */
const createSauce = async (sauceBody) => Sauce.create(sauceBody);

/**
 * Query for sauces
 * @returns {Promise<QueryResult>}
 */
const querySauces = async () => Sauce.find();

/**
 * Get sauce by id
 * @param {ObjectId} id
 * @returns {Promise<Sauce>}
 */
const getSauceById = async (id) => Sauce.findById(id).orFail();

/**
 * Update sauce by id
 * @param {ObjectId} sauceId
 * @param {Object} updateBody
 * @returns {Promise<Sauce>}
 */
const updateSauceById = async (sauceId, updateBody) => {
  const sauce = await Sauce.findById(sauceId).orFail();

  const { imageUrl } = sauce;

  Object.assign(sauce, updateBody);

  if (sauce.isModified('imageUrl')) {
    deleteSauceImage(imageUrl);
  }

  await sauce.save();

  return sauce;
};

/**
 * Delete sauce by id
 * @param {ObjectId} sauceId
 * @returns {Promise<Sauce>}
 */
const deleteSauceById = async (sauceId) => {
  const sauce = await Sauce.findByIdAndDelete(sauceId).orFail();

  deleteSauceImage(sauce.imageUrl);

  return sauce;
};

/**
 * like sauce by id from user id
 * @param {ObjectId} sauceId
 * @param {Object} likeBody
 * @returns {Promise<Sauce>}
 */
const likeSauceById = async (sauceId, likeBody) => {
  const sauce = await Sauce.findById(sauceId).orFail();

  sauce.like(likeBody);

  await sauce.save();

  return sauce;
};

module.exports = {
  createSauce,
  querySauces,
  getSauceById,
  updateSauceById,
  deleteSauceById,
  likeSauceById,
};
