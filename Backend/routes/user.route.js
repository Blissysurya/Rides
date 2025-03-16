const express=require('express');
const router=express.Router();
const {body} = require('express-validator');
const userController=require('../controllers/user.controller.js');
const authMiddleware=require('../middlewares/auth.middleware.js');




router.post('/register',[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min:5}).withMessage('Password should be atleast 5 characters long'),
    body('fullname.firstname').isLength({min:2}).withMessage('First name should be atleast 2 characters long'),
],
userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min:5}).withMessage('Password should be atleast 5 characters long'),
],
userController.loginUser
)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

router.get('/logout',authMiddleware.authUser,userController.logoutUser)

module.exports=router;  