//All the logic  of routes would be in the controller files

const express = require('express');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const userModel = require('../models/user.model.js');
const blackListTokenModel = require('../models/blacklistToken.model.js');


module.exports.registerUser= async function(req,res,next){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password}=req.body;
   
    const isUserAlreadyExist= await userModel.findOne({
        email
    });
    if(isUserAlreadyExist){
        return res.status(400).json({ message:'User with this email already exist.'})
    }
    const hashedPassword= await userModel.hashPassword(password);

    const user= await userService.createUser(
        {
        firstname:fullname.firstname ,
        lastname:fullname.lastname,
        email:email,
        password:hashedPassword
    }

    );   
    console.log(user);
    await user.save();
    const token=await user.generateAuthToken();
    res.status(201).json({user,token});
}

module.exports.loginUser= async function(req,res,next){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;
    const user= await userModel.findOne({ email }).select('+password')
    console.log(req.body)
    if(!user){
        return res.status(401).json({ message:'Invalid email '})
    }
    
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({ message:'Invalid  password.'})
    }
    const token=user.generateAuthToken();
    res.cookie('token',token);
    res.status(201).json({token,user})

}

module.exports.getUserProfile=async function(req,res,next){
        res.status(200).json(req.user);
}

module.exports.logoutUser=async function(req,res,next){
    res.clearCookie('token');
    const token =req.Cookie.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({token});
    res.status(200).json({message:'Logged out successfully'})
}