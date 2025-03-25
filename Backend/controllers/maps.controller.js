const { validationResult } = require('express-validator');
const mapService=require('../services/maps.service');

module.exports.getCordinates = async (req, res) => {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
  try {
    const address = req.query.address;
    const coordinates = await mapService.getAddressCoordnate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}