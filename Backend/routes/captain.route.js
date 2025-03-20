const express=require('express');
const captainController=require('../controllers/captain.controller.js');
const authMiddleware=require('../middlewares/auth.middleware.js');
const router=express.Router();
const {body} = require('express-validator');

router.post('/register',[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min:5}).withMessage('Password should be atleast 5 characters long'),
    body('fullname.firstname').isLength({min:2}).withMessage('First name should be atleast 2 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color should be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate should be atleast 3 characters long'),   
    body('vehicle.capacity').isNumeric().withMessage('Capacity should be a number'),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('Invalid vehicle type')

],captainController.registerCaptain)


router.post('/login',[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min:5}).withMessage('Password should be atleast 5 characters long'),
],captainController.loginCaptain)

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);

module.exports=router;