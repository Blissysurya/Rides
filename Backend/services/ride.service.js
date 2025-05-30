const rideModel = require('../models/ride.model');
const mapService = require('../services/maps.service');

const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');


function generateOtp(num){
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
}

async function getFare(pickup, destination) {

    if(!pickup || !destination) {
        throw new Error('Invalid pickup or destination address');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };  

    

    const fare = {
        auto: baseFare.auto + Math.round((((distanceTime.distance.value)/1000) * perKmRate.auto) + (distanceTime.duration.value/60 * perMinuteRate.auto)),
        car: baseFare.car + Math.round((((distanceTime.distance.value)/1000) * perKmRate.car) + (distanceTime.duration.value/60 * perMinuteRate.car)),
        motorcycle: baseFare.motorcycle + Math.round((((distanceTime.distance.value)/1000) * perKmRate.motorcycle) + (distanceTime.duration.value/60 * perMinuteRate.motorcycle))
    };

    return fare;

}

module.exports.getFare= getFare;

module.exports.createRide = async ({user, pickup, destination, vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('Invalid input');
    }
    const fare = await getFare(pickup, destination);
    const ride =  rideModel({
        user,
        pickup,
        destination,
        otp: generateOtp(6),
        fare: fare[vehicleType],
        
    });

    return ride;
}

module.exports.confirmRide = async ({rideId, captain, otp}) => {
     if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async ({rideId,otp, captain}) => {

    if(!rideId || !otp){
        throw new Error('Ride ID and OTP are required');
    }
    
    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'accepted'){
        throw new Error('Ride is not accepted');
    }

    if(ride.otp!== otp){
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing',
        
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride;

    }

module.exports.endRide = async ({rideId, captain}) => {
    if(!rideId){
        throw new Error('Ride ID is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(ride.status !== 'ongoing'){
        throw new Error('Ride is not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed',
        
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-ended',
        data: ride
    })

    return ride;
}
