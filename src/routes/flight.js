const express = require('express')
const flightController = require('../controllers/flight');
const { authenticate, authorize } = require('../helpers/auth');

const router = express.Router();

router 
    .get('/getall', flightController.getAll)
    .get('/getdetail/:idflight', flightController.getDetail)
    .post('/insert', authenticate, authorize, flightController.insert)
    .patch('/update/:idflight', authenticate, authorize, flightController.update)
    .delete('/delete/:idflight', authenticate, authorize, flightController.delete)

module.exports = router;