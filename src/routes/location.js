const express = require('express');
const locationController = require('../controllers/location');
const { authenticate, authorize } = require('../helpers/auth')

const router = express.Router();

router
    .get('/getall', authenticate, authorize,locationController.getall)
    .get('/getdetail/:idlocation', authenticate, authorize, locationController.getdetail)
    .post('/insert', authenticate, authorize, locationController.insert)
    .patch('/update/:idlocation', authenticate, authorize,locationController.update)
    .delete('/delete/:idlocation', authenticate, authorize, locationController.delete)

module.exports = router;
