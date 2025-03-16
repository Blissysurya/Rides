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
    console.log(req.body)
    const hashedPassword= await userModel.hashPassword(password);

    const user= await userService.createUser(
        {
        firstname:fullname.firstname ,
        lastname:fullname.lastname,
        email:email,
        password:hashedPassword
    }
    );   
    
    const token=await user.generateAuthToken();
    res.status(201).json({user,token});
}