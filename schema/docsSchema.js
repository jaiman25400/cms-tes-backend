const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
//import { docType } from "../types/docs.type";

//Define Schema
const docSchema = new Schema(
    {
        model: { type: mongoose.Schema.Types.ObjectId, ref: "Model" },
        modelName: { type: String, required: true },
        data: { type: Object, required: true },
        fileName : {type : String}
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports.docsModel = model("CMS1_Docs", docSchema);
