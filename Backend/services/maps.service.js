const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordnate = async (address) => {
  
    const apiKey = process.env.GOOGLE_MAPS_API; // Ensure your API key is stored in the .env file
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
    const response = await axios.get(url);

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(`Google Maps API error: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};

module.exports.getDistanceTime= async (origin,distance)=>{
  if(!origin || !distance){
    throw new Error('Origin and distance are required');
  }

  const apiKey = process.env.GOOGLE_MAPS_API; 
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(distance)}&key=${apiKey}`;

  try{
    const response = await axios.get(url);

    if(response.data.status === 'OK'){

        if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
          throw new Error('No results found for the given origin and destination');
        }

      return response.data.rows[ 0 ].elements[ 0 ];
    } else {
      throw new Error('Unable to fetch distance and time');
    }

  
  }catch(err){
    console.log(err);
    throw err;
  }

}

module.exports.getAutoCompleteSuggestions = async (input) => {

  if(!input){
    throw new Error('Input is required');
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url= `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try{
    const response = await axios.get(url);

    if(response.data.status === 'OK'){
      return response.data.predictions;
    } else {
      throw new Error('Unable to fetch autocomplete suggestions');
    }
  }catch(err){
    console.log(err);
    throw err;
  }

}

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    console.log(`Looking for captains at coordinates: lat=${lat}, lng=${lng} with radius=${radius}km`);
    
    try {
        // First, log all captains to see what we're working with
        const allCaptains = await captainModel.find({});
        console.log(`Total captains in database: ${allCaptains.length}`);
        
        // Check which captains have location data
        const captainsWithLocation = allCaptains.filter(c => 
            c.location && (c.location.ltd !== undefined || c.location.lng !== undefined)
        );
        console.log(`Captains with some location data: ${captainsWithLocation.length}`);
        
        // Log the location data for all captains for debugging
        captainsWithLocation.forEach(c => {
            console.log(`Captain ${c._id} location:`, c.location);
            
            // Calculate distance to determine if in range
            const latDiff = Math.abs(parseFloat(c.location.ltd) - parseFloat(lat));
            const lngDiff = Math.abs(parseFloat(c.location.lng) - parseFloat(lng));
            
            const latKm = latDiff * 111;  // 111km per degree of latitude
            const lngKm = lngDiff * 111 * Math.cos(parseFloat(lat) * (Math.PI/180)); // Adjust for longitude at this latitude
            
            const distanceKm = Math.sqrt(latKm*latKm + lngKm*lngKm); // Simple distance formula
            
            if (distanceKm <= radius) {
                console.log(`The pickup location and captain coordinates are within the range`);
            } else {
                console.log(`Distance to captain: ${distanceKm.toFixed(2)}km - outside ${radius}km radius`);
            }
        });
        
        // Use the correct field names in the query (ltd instead of lat)
        const captains = await captainModel.find({}).then(captains => {
            // Filter in-memory instead of using MongoDB query
            return captains.filter(captain => {
                if (!captain.location || !captain.location.ltd || !captain.location.lng) {
                    return false;
                }
                
                // Calculate distance using Haversine formula
                const latDiff = Math.abs(parseFloat(captain.location.ltd) - parseFloat(lat));
                const lngDiff = Math.abs(parseFloat(captain.location.lng) - parseFloat(lng));
                
                const latKm = latDiff * 111;
                const lngKm = lngDiff * 111 * Math.cos(parseFloat(lat) * (Math.PI/180));
                
                const distanceKm = Math.sqrt(latKm*latKm + lngKm*lngKm);
                
                return distanceKm <= radius;
            });
        });
        
        console.log(`Found ${captains.length} captains in the ${radius}km radius`);
        return captains;
    } catch (err) {
        console.error('Error in getCaptainsInTheRadius:', err);
        return [];
    }
}