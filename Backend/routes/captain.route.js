const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require('../Middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),
    body('location.lat').isFloat().withMessage('Latitude is required and must be a number'),
    body('location.lng').isFloat().withMessage('Longitude is required and must be a number')
], async (req, res, next) => {
    await captainController.registerCaptain(req, res, next);
});

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res, next) => {
    await captainController.loginCaptain(req, res, next);
});

router.get('/profile', authMiddleware.authCaptain, async (req, res, next) => {
    await captainController.getCaptainProfile(req, res, next);
});

router.get('/logout', authMiddleware.authCaptain, async (req, res, next) => {
    await captainController.logoutCaptain(req, res, next);
});

module.exports = router;