const jwt = require('jsonwebtoken');
var util= require('util');
const utf8Encoder = new util.TextEncoder();
const utf8Decoder = new util.TextEncoder("utf-8", { ignoreBOM: true });
const generateToken = (id) => {
    return jwt.sign({ id } , "MyOwnHeadlessCMS", { expiresIn: '30d'} )
}

module.exports = generateToken;
//MyOwnHeadlessCMS is a JWT SECRET KEY