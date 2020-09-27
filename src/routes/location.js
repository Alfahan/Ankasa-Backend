const express = require('express');
const locationController = require('../controllers/location');

const router = express.Router();

router
    .get('/getall', locationController.getall)
    
module.exports = router;
