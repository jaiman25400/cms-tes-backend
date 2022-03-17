const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const mediaSchema = new Schema(
    {
        mediaSchema: { type: Object, required: true },
        fileName : { type:String , required: true},
        name : { type:String , required: true},
        key : { type:String },
        archive : { type:Boolean, default: false},
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports.mediaModel = model("media_Docs", mediaSchema);
