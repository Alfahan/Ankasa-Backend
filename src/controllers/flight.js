const flightModel = require('../models/flight')
const { success, failed, successWithMeta } = require('../helpers/response')

const flight = {
    getAll: (req, res) => {
        try {
            const sort = !req.query.sort ? 'class' : req.query.sort
            const type = !req.query.type ? 'ASC' : req.query.type
            const direct = !req.query.direct ? 1 : parseInt(req.query.direct)
            const transit = !req.query.transit ? 1 : parseInt(req.query.transit)
            const transit2 = !req.query.transit2 ? 1 : parseInt(req.query.transit2)
            const luggage = !req.query.luggage ? 1 : parseInt(req.query.luggage)
            const meal = !req.query.meal ? 1 : parseInt(req.query.meal)
            const wifi = !req.query.wifi ? 1 : parseInt(req.query.wifi)
            const departuretimeFrom = !req.query.departuretimeFrom ? '00:00:00' : req.query.departuretimeFrom
            const departuretimeTo = !req.query.departuretimeTo ? '24:00:00' : req.query.departuretimeTo
            const timearrivedFrom = !req.query.timearrivedFrom ? '00:00:00' : req.query.timearrivedFrom
            const timearrivedTo = !req.query.timearrivedTo ? '24:00:00' : req.query.timearrivedTo
            const priceLow = !req.query.priceLow ? 0 : parseInt(req.query.priceLow)
            const priceHigh = !req.query.priceHigh ? 99999999999 : parseInt(req.query.priceHigh)
            flightModel.getAll(sort, type, departuretimeFrom, departuretimeTo, timearrivedFrom, timearrivedTo, priceLow, priceHigh)
            .then((result) => {
                console.log(meal)
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