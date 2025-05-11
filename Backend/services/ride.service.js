const rideModel = require('../models/ride.model');
const mapService = require('../services/maps.service');

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
        auto: baseFare.auto + (((distanceTime.distance.value)/1000) * perKmRate.auto) + (distanceTime.duration.value * perMinuteRate.auto),
        car: baseFare.car + (distanceTime.distance.value * perKmRate.car) + (distanceTime.duration.value * perMinuteRate.car),
        motorcycle: baseFare.motorcycle + (distanceTime.distance.value * perKmRate.motorcycle) + (distanceTime.duration.value * perMinuteRate.motorcycle)
    };

    return fare;

}

module.exports.createRide = async ({user, pickup, destination, vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('Invalid input');
    }
    const fare = await getFare(pickup, destination);
    const ride = new rideModel({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        
    });

    return ride;
}

