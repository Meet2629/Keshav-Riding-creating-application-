const userModel= require('../models/user.model.js');
const userService = require('../services/user.service.js');
const {validationResult} = require('express-validator');

module.exports.registerUser= async(req,res) =>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
   

    console.log(req.body); 

    const {fullname, email , password} = req.body;

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




