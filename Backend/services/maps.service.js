const axios = require('axios');

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