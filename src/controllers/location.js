const locationModel = require('../models/location')
const { success, failed } = require('../helpers/response')

    const location = {
        getall: (req,res) => {
            try {
                locationModel.getall()
                .then((result) => {
                    success(res, result, 'Get All Location Success')
                }).catch((err) => {
                    failed(res, [], err.message)
                })
            } catch (error) {
                failed(res, [], err.message)
            }
        }
    } 

module.exports = location