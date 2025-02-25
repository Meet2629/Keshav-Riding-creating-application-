const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

module.exports.refreshToken = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        const newToken = user.generateAuthToken();
        res.cookie('token', newToken, { httpOnly: true });
        return res.status(200).json({ accessToken: newToken });
    } catch (err) {
        console.error("❌ Token Refresh Error:", err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
