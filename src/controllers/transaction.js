const transactionModel = require('../models/transaction')
const { success, failed } = require('../helpers/response')
// const QRCode = require('qrcode')

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
            failed(res, [], `Internal Server Error`)
        }
    },
    booking: (req,res) => {
        try {
            
            const body = req.body
            const data = {
                iduser : body.iduser,
                idflight: body.idflight,
                nationality : body.nationality,
                insurance : body.insurance,
                child : body.child,
                adult : body.adult,
                payment: body.payment,
                status : 0
            }

            transactionModel.booking(data)
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
            
            transactionModel.bookinguser(id)
            .then((result) => {
                success(res, result, `Data Booking User`)
            }).catch((err) => {
                (res, [], err.message)
            })
        } catch (error) {
            failed(res,[], `Internal Server Error`)
        }
    }
}

module.exports = transaction