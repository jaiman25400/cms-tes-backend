const User = require('../schema/userModel')
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');

exports.authUser = async(req,res) => {
    const { email, password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists && (await userExists.matchPassword(password))){
        res.json({
            userId: userExists.userId,
            firstName: userExists.firstName,
            lastName: userExists.lastName,
            email: userExists.email,
            role: userExists.role,
            key: userExists.key,
            token: generateToken(userExists.userId)
        })
    } else {
        res.status(404).json({message: "INVALID Email and Password"});        
    }

}

exports.protect = async(req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, "MyOwnHeadlessCMS")
            userId = decoded.id

            //select -password means password wont be returned
            req.user = await User.findOne({userId}).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({message: 'Not AUTHORIZED, token failed'})
        }
    }

    if(!token){
        res.status(401).json({message: 'Not Authorized, no token'}) 
    }
}