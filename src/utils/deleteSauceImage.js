const fs = require('fs');
const path = require('path');

const deleteSauceImage = async (imageUrl) => {
  const image = path.resolve(__dirname, './../../uploads/images', path.basename(imageUrl));

  fs.access(image, fs.constants.F_OK, (err) => {
    if (!err) {
      // should be false positive warning as we are using path module and imageUrl was validated
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.unlinkSync(image);
    }
  });
};

module.exports = deleteSauceImage;
