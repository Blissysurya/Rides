const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId, broadcastToCaptains } = require('../socket');
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');

module.exports.createRide = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    const {userId, pickup, destination, vehicleType} = req.body;
    
    try{
        // Create the ride instance
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});
        await ride.save(); // Save the ride to DB so it gets an _id

        const pickupCoordinates = await mapService.getAddressCoordnate(pickup);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 5000);

        ride.otp = ""; // Hide OTP from captains

        const rideWithUser = await rideModel.findOne({_id: ride._id }).populate('user');

        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        });

        console.log("Captains in radius:", captainsInRadius);

        return res.status(201).json(ride);
    } catch(err){
        console.error("Error creating ride:", err);
        return res.status(400).json({message: err.message});
    }
}
// ...existing code...


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

    const { rideId } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain });

        console.log("Sending ride-confirmed event to user with socketId:", ride.user.socketId);
        
        // Make sure we're sending the complete ride object with user and captain data
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        });
 
        return res.status(200).json(ride);
    } catch (err) {
        console.error("Error confirming ride:", err);
        return res.status(500).json({ message: err.message });
    }
}

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        console.log("Sending ride-ended event to user with socketId:", ride.user.socketId);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error("Error ending ride:", err);
        return res.status(500).json({ message: err.message });
    }
}