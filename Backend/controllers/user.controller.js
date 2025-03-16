//All the logic  of routes would be in the controller files

const express = require('express');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const userModel = require('../models/user.model.js');


module.exports.registerUser= async function(req,res,next){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password}=req.body;
   
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
    res.status(201).json({token,user})

}

module.exports.getUserProfile=async function(req,res,next){
    
}