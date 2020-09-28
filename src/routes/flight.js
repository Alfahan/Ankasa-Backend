const express = require('express')
const flightController = require('../controllers/flight')

const router = express.Router();

router 
    .get('/getall', flightController.getAll)
    .get('/getdetail/:idflight', flightController.getDetail)
    .post('/insert', flightController.insert)
    .patch('/update/:idflight', flightController.update)
    .delete('/delete/:idflight', flightController.delete)

module.exports = router;