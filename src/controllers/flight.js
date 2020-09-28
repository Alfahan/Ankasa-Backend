const flightModel = require('../models/flight')
const { success, failed } = require('../helpers/response')

const flight = {
    getAll: (req, res) => {
        try {
            flightModel.getAll()
            .then((result) => {
                success(res, result, 'Here are all flight data that you request')
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal server error!')
        }
    },
    getDetail: (req, res) => {
        try {
            const idflight = req.params.idflight
            flightModel.getDetail(idflight)
            .then((result) => {
                success(res, result, `Here is flight data with id = ${idflight}`)
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal server error!')
        }
    },
    insert: (req, res) => {
        try {
            const body = req.body
            flightModel.insert(body)
            .then((result) => {
                success(res, result, 'Flight data is successfully inserted')
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal server error!')
        }
    },
    update: (req, res) => {
        try {
            const idflight = req.params.idflight
            const body = req.body
            
            flightModel.update(body, idflight)
            .then((result) => {
                success(res, result, `Flight data with id = ${idflight} is updated`)
            })
            .catch((err) => {
                failed(res, [],err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal server error!')
        }
    },
    delete: (req, res) => {
        try {
            const idflight = req.params.idflight
            flightModel.delete(idflight)
            .then((result) => {
                success(res, result, `Flight data with id = ${idflight} is deleted`)
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal server error')
        }
    }
}
module.exports = flight