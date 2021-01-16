const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const handleSauceImage = require('../middlewares/handleSauceImage');
const sauceValidation = require('../validations/sauce.validation');
const sauceController = require('../controllers/sauce.controller');

const router = express.Router();

router
  .route('/')
  .post(auth, handleSauceImage, validate(sauceValidation.createSauce), sauceController.createSauce)
  .get(auth, validate(sauceValidation.getSauces), sauceController.getSauces);

router
  .route('/:sauceId')
  .get(auth, validate(sauceValidation.getSauce), sauceController.getSauce)
  .put(auth, handleSauceImage, validate(sauceValidation.updateSauce), sauceController.updateSauce)
  .delete(auth, validate(sauceValidation.deleteSauce), sauceController.deleteSauce);

router
  .route('/:sauceId/like')
  .post(auth, validate(sauceValidation.likeSauce), sauceController.likeSauce);

module.exports = router;
