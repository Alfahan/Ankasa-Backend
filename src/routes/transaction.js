const express = require('express');
const transactionController = require('../controllers/transaction');


const router = express.Router();

router
    .get('/getall', transactionController.getall) // admin
    .post('/booking', transactionController.booking) //insert
    .get('/bookingdetail/:idtransaction', transactionController.bookingdetail) //detailtransaksi
    .get('/bookingusers/:iduser', transactionController.bookinguser) //halaman booking user

module.exports = router;