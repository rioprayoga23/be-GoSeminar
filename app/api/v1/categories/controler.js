const Category = require("./model");

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await Category.create({ name });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await Category.find().select("_id name");
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Category.findOne({ _id: id });
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await Category.findByIdAndUpdate(
      { _id: id },
      { name },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Category.findByIdAndRemove(id);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index, find, update, destroy };
