const express = require('express');
const locationController = require('../controllers/location');

const router = express.Router();

router
    .get('/getall', locationController.getall)
    .get('/getdetail/:idlocation', locationController.getdetail)
    .post('/insert', locationController.insert)
    .patch('/update/:idlocation',locationController.update)
    .delete('/delete/:idlocation', locationController.delete)

module.exports = router;
