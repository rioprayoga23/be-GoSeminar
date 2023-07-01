const { Schema, model } = require("mongoose");

const imageSchema = Schema(
  {
    url_img: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Image", imageSchema);
