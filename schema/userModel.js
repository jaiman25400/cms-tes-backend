const mongoose = require("mongoose");
const MUUID = require('uuid-mongodb');
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: () => MUUID.v1()
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user','superAdmin'],
        // required: true
    },
    privilege : {
        type: Array,
        default: []
    },
    key: {
        type: String,
        default: ''
    }
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model('CMS_User', userSchema);