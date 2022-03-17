const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

//Define Model
const modelSchema = new Schema(
    {
        modelSchema: { type: Object, required: true },
        name: { type: String, required: true, index: true, unique: true },
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports.modelModel = model("CMS1_Models", modelSchema);
