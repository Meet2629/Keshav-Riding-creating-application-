const userModel= require('../models/user.model.js');
const userService = require('../services/user.service.js');
const {validationResult} = require('express-validator');
const {BlacklistTokenModel} = require('../models/BlacklistToken.model.js');
const jwt = require('jsonwebtoken'); 

module.exports.registerUser= async(req,res,next) =>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
   

    console.log(req.body); 

    const {fullname, email , password} = req.body;

     const isUserAlreadyExist =await userModel.findOne({email});

     if(isUserAlreadyExist){
        return res.status(400).json({message: 'User already exist'});
     }

    const hashedpassword = await userModel.hashPassword(password);

    const user =await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashedpassword
    });

    const token= user.generateAuthToken();

    res.status(201).json({ token,user});
}

module.exports.loginUser =async(req,res,next) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} =req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user)
    {
        return res.status(401).json({message: 'Invalid Email or Password'});
    }

    const isMatch =await user.comparePassword(password);

    if(!isMatch)
        {
            return res.status(401).json({message: 'Invalid Email or Password'});
        }

        const token = user.generateAuthToken();

         res.cookie('token',token);

         
            // httpOnly: true,
            // secure:process.env.NODE_ENV === 'production',
            // maxAge:3600000
            
        res.status(200).json({token,user});
}

module.exports.getUserProfile=async(req,res,next) =>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        // Retrieve the token from either cookies or headers
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token (using your JWT verification method)
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT verification logic
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Add token to blacklist (logout)
        await BlacklistTokenModel.create({ token });

        res.clearCookie('token');  // Clear token from cookies
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
