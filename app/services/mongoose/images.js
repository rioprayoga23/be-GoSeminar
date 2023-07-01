const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

const createImages = async (req) => {
  const result = await Images.create({
    url_img: req.file
      ? `uploads/${req.file.filename}`
      : `uploads/avatar/default.jpeg`,
  });

  return result;
};

const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });

  if (!result) throw new NotFoundError(`No image with id: ${id}`);

  return result;
};

module.exports = { createImages, checkingImage };
