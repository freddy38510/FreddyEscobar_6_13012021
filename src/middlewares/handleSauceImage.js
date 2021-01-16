const path = require('path');
const httpStatus = require('http-status');
const multer = require('multer');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.resolve(__dirname, './../../uploads/images'));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);

    cb(null, `${Date.now()}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);

    return;
  }

  cb(new ApiError(httpStatus.BAD_REQUEST, 'unsupported image type'));
};

const uploadImage = multer({ storage, fileFilter }).single('image');

const parseSauceBody = function (req, _res, next) {
  if (req.file) {
    req.body = {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${config.host}:${config.port}/images/${req.file.filename}`,
    };
  }

  return next();
};

module.exports = [uploadImage, parseSauceBody];
