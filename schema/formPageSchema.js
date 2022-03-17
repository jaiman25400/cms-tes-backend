const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const formPageSchema = new Schema(
  {
    formPageSchema: { type: Object, required: true },
    name: { type: String, required: true, index: true, unique: true },
    description : { type: String },
    Key : { type: String, required: true, index: true, unique: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports.formPageModel = model("CMS1_FormPage", formPageSchema);
