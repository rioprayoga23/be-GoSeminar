const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let categorySchema = Schema(
  {
    name: {
      type: String,
      minlength: [3, "Minimum category name length: 3 characters"],
      maxLength: [20, "Maximum category name length: 20 characters"],
      required: [true, "Category name is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
