const rideService = require('../services/ride.service');

const { validationResult } = require('express-validator');


module.exports.createRide = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const {userId, pickup, destination, vehicleType} = req.body;
    console.log(userId);
    try{
        const ride = await rideService.createRide({user: userId, pickup, destination, vehicleType});
        return res.status(201).json(ride);
    }catch(err){
        return res.status(400).json({message: err.message});
    }

}