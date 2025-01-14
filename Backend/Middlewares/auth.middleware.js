const userModel =require('../models/user.model');
const bcrypt =  require('bcrypt');
const jwt= require('jsonwebtoken');
const BlacklistTokenModel = require('../models/BlacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req,res,next) =>{
    const token =req.cookies.token || 
    (req.headers.authorization?.split(' ')[1]);
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

      const isBlacklisted =await BlacklistTokenModel.findOne({ token : token});

      if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized'});
      }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();


    }catch(err){
        return res.status(401).json({message: 'Unauthorized'});
    }
}

module.exports.authCaptain = async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Check if token is blacklisted
    const isBlacklisted = await BlacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find captain by ID
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(404).json({ message: 'Captain not found' });
    }

    // Attach captain to the request object
    req.captain = captain;

    // Proceed to the next middleware
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
