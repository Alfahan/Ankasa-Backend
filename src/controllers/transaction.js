const transactionModel = require('../models/transaction')
const { success, failed } = require('../helpers/response')
const QRCode = require('qrcode')

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
            const dataobj = {
                iduser : body.iduser,
                idflight: body.idflight,
                nationaly : body.nationaly,
                insurance : body.insurance,
                child : body.child,
                adult : body.adult,
                payment: body.payment,
                status : body.status
            }

            const data = JSON.stringify(dataobj)
            
            const qr = QRCode.toString(data, function (err, url) {
                console.log(url)
              })
            const trans = {
                qr : qr,
                iduser : body.iduser,
                idflight: body.idflight,
                nationaly : body.nationaly,
                insurance : body.insurance,
                child : body.child,
                adult : body.adult,
                payment: body.payment,
                status : body.status
            }
            console.log(qr)
            console.log(data)
            console.log(trans)
            transactionModel.booking(trans)
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