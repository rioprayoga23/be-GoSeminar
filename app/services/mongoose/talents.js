// import model Talents
const Talents = require("../../api/v1/talents/model");
const { checkingImage } = require("./images");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let condition = {};

  if (keyword) {
    condition = { ...condition, name: { $regex: keyword, $options: "i" } };
  }

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id url_img",
    })
    .select("_id name role image");

  return result;
};

const createTalents = async (req) => {
  const { name, role, image } = req.body;

  await checkingImage(image);

  const check = await Talents.findOne({ name });

  if (check) throw new BadRequestError("Talent name duplicated");

  const result = await Talents.create({ name, image, role });

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id })
    .populate({
      path: "image",
      select: "_id url_img",
    })
    .select("_id name role image");

  if (!result) throw new NotFoundError(`No talent with id :  ${id}`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;

  await checkingImage(image);

  const check = await Talents.findOne({
    name,
    _id: { $ne: id },
  });

  if (check) throw new BadRequestError("Talent name duplicated");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, role, image },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`No talent with id :  ${id}`);

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findByIdAndRemove(id);
  if (!result) throw new NotFoundError(`No talent with id :  ${id}`);

  return result;
};

const checkingTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
  checkingTalents,
};
