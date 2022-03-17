const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const validationSchema = new Schema(
    {
        validationSchema: { type: Object, required: true },
        form: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
        formName : { type: String, required: true },
        name: { type: String, required: true, index: true, unique: true },
        Key : { type: String, required: true, index: true, unique: true },
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports.validationModel = model("CMS1_Validation", validationSchema);