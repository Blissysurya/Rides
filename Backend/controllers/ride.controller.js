const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');


module.exports.createRide = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const {pickup, destination, vehicleType} = req.body;
    
    try{
        // Create the ride instance
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});
        // Save the ride to DB so it gets an _id
        await ride.save();

        // Now, attempt to find captains and send them the ride info
        try {
            const pickupCoordinates = await mapService.getAddressCoordnate(pickup);
            console.log('Pickup Coordinates:', pickupCoordinates);
            
            
            const captainsInRadius = await mapService.getCaptainsInTheRadius(
               pickupCoordinates.lat, 
               pickupCoordinates.lng, 
               500
            );
            // Remove OTP before sending to captain
            ride.otp = "";

            // Fetch the ride with populated user data
            const rideWithUser = await rideModel.findOne({ _id: ride._id}).populate('user');

            captainsInRadius.map(async (captain) => {
                console.log('Sending new-ride to captain socketId:', captain.socketId, 'ride:', rideWithUser);
                sendMessageToSocketId(captain.socketId,  {
                    event: 'new-ride',
                    data: rideWithUser
                });
            })
        } catch (innerError) {
            // Log error but don't affect the response
            console.error("Error finding captains:", innerError);
        }
        
        // Return the response only once
        return res.status(201).json(ride);
    } catch(err){
        return res.status(400).json({message: err.message});
    }
}


module.exports.getFare = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const {pickup, destination} = req.query;
    
    try{
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    }catch(err){
        return res.status(400).json({message: err.message});
    }

}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId, otp} = req.body;

    try{
        // Pass all necessary parameters to the service
        const ride = await rideService.confirmRide({
            rideId, 
            captain: req.captain,
            otp
        });

        // Send appropriate socket messages
        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-confirmed',
                data: ride
            });
        }

        return res.status(200).json(ride);
    } catch(err) {
        console.error("Error confirming ride:", err);
        return res.status(500).json({message: err.message});
    }
};

module.exports.startRide = async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {rideId, otp} = req.query;

    try{
        // Pass all necessary parameters to the service
        const ride = await rideService.startRide({
            rideId, 
            captain: req.captain,
            otp
        });

        sendMessageToSocketId(ride.user.socketId,{
                event: 'ride-started',
                data: ride
        })

        return res.status(200).json(ride);
    } catch(err) {
        console.error("Error starting ride:", err);
        return res.status(500).json({message: err.message});
    }

}