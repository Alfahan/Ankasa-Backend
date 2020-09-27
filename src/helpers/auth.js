const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../helpers/env')
const { tokenStatus } = require('../helpers/response')

const auth = {
    authenticate: (req, res, next) => {
        const token = req.headers.token
        if(token === "undefined" || token === ''){
            tokenStatus(res, [], 'Token undetected. Please insert token!')
        } else {
            next( )
        }
    },
    authorize: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, JWT_KEY, (err) => {
            if (err && err.name === 'TokenExpiredError') {
                tokenStatus(res, [], 'Token Expired! Please log in again')
            } else if (err && err.name === 'JsonWebTokenError'){
                tokenStatus(res, [], 'Authorization Failed!')
            } else {
                next()
            }
        })
         
    }
}

module.exports = auth