const usersModel = require('../models/users')
const { success, failed, tokenStatus } = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../helpers/env')

const users = {
    register: async (req, res) => {
        try {
            const body = req.body

            const salt = await bcrypt.genSalt(10)
            const hashWord = await bcrypt.hash(body.password, salt)

            const data = {
                email: body.email, 
                username: body.username,
                password: hashWord,
                level: body.level
            }

            usersModel.register(data)
            .then((result) => {
                success(res, result, 'You are registered')
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal server error!')            
        }
    },
    login: async (req, res) => {
        try {
            const body = req.body
            usersModel.login(body)

            .then(async(result) => {
                const userData = result[0]
                const hashWord = userData.password
                const correct = await bcrypt.compare(body.password, hashWord)

                if (correct) {
                    jwt.sign(
                        { email : userData.email },
                        JWT_KEY,
                        { expiresIn: 60 },

                        (err, token) => {
                            if (err) {
                                console.log(err)
                            } else {
                                tokenStatus(res, {token: token}, "Login success!")
                            }
                        }
                    ) 
                } else {
                    failed(res, [], "Incorrect password! Please try again")
                }
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal server error!')
        }
    }
}

module.exports = users