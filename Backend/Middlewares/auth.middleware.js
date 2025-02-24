const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blackListTokenModel = require('../models/blackListToken.model');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Utility function to verify token and check blacklist
const verifyToken = async (req) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) throw new Error('Token blacklisted');

    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports.authUser = async (req, res, next) => {
    try {
        const decoded = await verifyToken(req);
        console.log("✅ Decoded User Token:", decoded);

        const user = await userModel.findById(decoded._id);
        if (!user) throw new Error('User not found');

        req.user = user;
        next();
    } catch (err) {
        console.error("❌ User Authentication Error:", err.message);
        return res.status(401).json({ message: `Unauthorized: ${err.message}` });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔍 Decoded Token:", decoded);

        let captain = await captainModel.findById(decoded._id);

        if (!captain) {
            console.log("❌ Captain not found. Token might be outdated.");
            return res.status(401).json({ message: 'Unauthorized: Token expired, please log in again' });
        }

        req.captain = captain;
        return next();
    } catch (err) {
        console.log("❌ JWT Verification Error:", err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};




