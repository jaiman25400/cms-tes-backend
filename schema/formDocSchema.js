const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
//import { docType } from "../types/docs.type";

//Define Schema
const formDocSchema = new Schema(
    {
        form: { type: mongoose.Schema.Types.ObjectId, ref: "Form" },
        formName: { type: String, required: true },
        formContentName: { type: String, required: true },
        data: { type: Object, required: true },
        fileName : {type : String},
        mediaName :  { type: String },
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports.formDocModel = model("CMS1_formDocs", formDocSchema);
