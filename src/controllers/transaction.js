const transactionModel = require('../models/transaction')
const { success, failed } = require('../helpers/response')

const transaction = {
    getall: (req,res) => {
        try {
            transactionModel.getall()
            .then((result) => {
                success(res, result, `Here are the booking that data you requested`)
            }).catch((err) => {
                failed(res, [], err)
            })
        } catch (error) {
            // failed(res, [], `Internal Server Error`)
        }
    },
    booking: (req,res) => {
        try {
            const body = req.body
            console.log(body)
            transactionModel.booking(body)
            .then((result) => {
                success(res, result, `Data Booking Success`)
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res,[], `Internal Server Error`)
        }
    },
    bookingdetail: (req,res) => {
        try {
            const id = req.params.idtransaction
            transactionModel.bookingdetail(id)
            .then((result) => {
                success(res, result, `Data Detail Booking`)
            }).catch((err) => {
                (res, [], err.message)
            })
        } catch (error) {
            failed(res, [], `Internal Server Error`)
        }
    },
    bookinguser: (req, res) => {
        try {
            const id = req.params.iduser
            // console.log(id)
            transactionModel.bookinguser(id)
            .then((result) => {
                success(res, result, `Data Booking User`)
            }).catch((err) => {
                (res, [], err.message)
            })
        } catch (error) {
            // failed(res,[], `Internal Server Error`)
        }
    }
}

module.exports = transaction