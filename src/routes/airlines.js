const express = require('express')
const airlinesController = require('../controllers/airlines')
const { authenticate, authorize } = require('../helpers/auth')


const router = express.Router();

router 
    .get('/getall', airlinesController.getall)
    .get('/getdetail/:idairlines', airlinesController.getdetail)
    .post('/insert', authenticate, authorize, airlinesController.insert)
    .patch('/update/:idairlines', authenticate, authorize, airlinesController.update)
    .delete('/delete/:idairlines', authenticate, authorize, airlinesController.delete)

module.exports = router;