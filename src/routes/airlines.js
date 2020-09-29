const express = require('express')
const airlinesController = require('../controllers/airlines')

const router = express.Router();

router 
    .get('/getall', airlinesController.getall)
    .get('/getdetail/:idairlines', airlinesController.getdetail)
    .post('/insert', airlinesController.insert)
    .patch('/update/:idairlines',airlinesController.update)
    .delete('/delete/:idairlines', airlinesController.delete)

module.exports = router;