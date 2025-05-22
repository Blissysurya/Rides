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
    
    const {pickup, destination, vehicleType} = req.body;
    
    try{
        // Create the ride instance
        const ride = await rideService.createRide({user: req.user._id, pickup, destination, vehicleType});
        // Save the ride to DB so it gets an _id
        await ride.save();

        // Fetch the ride with populated user data
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        console.log(`Created new ride with ID: ${ride._id}`);

        // Now, attempt to find captains and send them the ride info
        try {
            const pickupCoordinates = await mapService.getAddressCoordnate(pickup);
            console.log('Pickup Coordinates:', pickupCoordinates);
            
            // First approach: Find captains in radius
            const captainsInRadius = await mapService.getCaptainsInTheRadius(
               pickupCoordinates.lat, 
               pickupCoordinates.lng, 
               500
            );
            
            console.log(`Found ${captainsInRadius.length} captains in radius`);
            
            // Send ride to each captain in radius
            if (captainsInRadius.length > 0) {
                captainsInRadius.forEach(captain => {
                    if (captain.socketId) {
                        console.log(`Sending ride to captain ${captain._id} with socketId ${captain.socketId}`);
                        sendMessageToSocketId(captain.socketId, {
                            event: 'new-ride',
                            data: rideWithUser
                        });
                    } else {
                        console.log(`Captain ${captain._id} has no socketId`);
                    }
                });
            } else {
                console.log("No captains in radius, broadcasting to all available captains");
                // Fallback: If no captains in radius, broadcast to all available captains
                const activeCaptains = await captainModel.find({ 
                    socketId: { $exists: true, $ne: null },
                    status: 'active'
                });
                
                activeCaptains.forEach(captain => {
                    sendMessageToSocketId(captain.socketId, {
                        event: 'new-ride',
                        data: rideWithUser
                    });
                });
                
                // If still no captains found, broadcast to ALL captains
                if (activeCaptains.length === 0) {
                    console.log("No active captains found, broadcasting to all captains");
                    broadcastToCaptains({
                        event: 'new-ride',
                        data: rideWithUser
                    });
                }
            }
        } catch (innerError) {
            console.error("Error finding captains:", innerError);
            // Fallback: broadcast to all captains
            broadcastToCaptains({
                event: 'new-ride',
                data: rideWithUser
            });
        }
        
        // Return the response
        return res.status(201).json(ride);
    } catch(err){
        console.error("Error creating ride:", err);
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
