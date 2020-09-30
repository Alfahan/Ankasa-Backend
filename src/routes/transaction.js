const express = require('express');
const transactionController = require('../controllers/transaction');
const { authenticate, authorize } = require('../helpers/auth')



const router = express.Router();

router
    .get('/getall', authenticate,authorize, transactionController.getall) // admin
    .post('/booking', authenticate, authorize, transactionController.booking) //insert
    .get('/bookingdetail/:idtransaction', authenticate, authorize, transactionController.bookingdetail) //detailtransaksi
    .get('/bookingusers/:iduser', authenticate, authorize, transactionController.bookinguser) //halaman booking user

module.exports = router;