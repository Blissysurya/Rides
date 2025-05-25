const { validationResult } = require('express-validator');
const mapService=require('../services/maps.service');

module.exports.getCordinates = async (req, res) => {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
  try {
    const {address} = req.query;
    const coordinates = await mapService.getAddressCoordnate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports.getDistanceTime = async (req,res)=>{
   try{
      const error = validationResult(req);
      if(!error.isEmpty()){
        return res.status(400).json({errors : error.array()})
      }

      const {origin, destination} = req.query;

      const distanceTime = await mapService.getDistanceTime(origin,destination);

      res.status(200).json(distanceTime);


   }catch(err){
      console.error(err);
      res.status(500).json({message : 'Internal server error'})
   }
}

module.exports.getAutoCompleteSuggestions = async (req,res) =>{
    try{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
      }

      const {input} = req.query;  
      const suggestions = await mapService.getAutoCompleteSuggestions(input);
      // Map to array of strings
      const suggestionDescriptions = suggestions.map(s => s.description);
      res.status(200).json(suggestionDescriptions);

    }catch(err){
        console.error(err);
        res.status(500).json({message : 'Internal server error'})
    }
}