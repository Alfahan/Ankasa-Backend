const usersModel = require('../models/users')
const { success, failed, tokenStatus } = require('../helpers/response')
const { JWT_KEY, passwordd, emaill, url } = require('../helpers/env')
const upload = require('../helpers/uploaduser')
const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailer = require('nodemailer')

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
                level: 2,
                active: 0
            }

            usersModel.register(data)
            .then(() => {
                const hashWord = jwt.sign({
                    email: data.email
                }, JWT_KEY)
                
                console.log(hashWord)
                let transporter = mailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth:{
                        user: emaill,
                        pass: passwordd
                    }
                })

                let mailOptions = {
                    from    : emaill,
                    to      : data.email,
                    subject : `HELLO ${data.email}`,
                    html:
                    `PLEASE ACTIVATION OF EMAIL ! <br>
                    KLIK --> <a href="${url}users/verify/${hashWord}"> Activation</a>  <---`
                }

                transporter.sendMail(mailOptions,(err, result) => {
                    if(err) {
                        res.status(505)
                        failed(res, [], err.message)
                    } else {
                        success(res, [result], `Send Mail Success`)
                    }
                })

                res.json({
                    message: `Success Registration, Please Activation of Email`
                })
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal server error!')            
        }
    },
    verify: (req,res) => {
        const token = req.params.token
        if(token) {
            jwt.verify(token, JWT_KEY, (err,decode) => {
                if(err){
                    res.status(505)
                    failed(res, [], `Failed Activation`)
                }else{
                    const email = decode.email
                    usersModel.getUsers(email)
                    .then((result) => {
                        if(result.affectedRows){
                            res.status(200)
                            success(res, {email}, `Congrats Gaes`)
                        }else{
                            res.status(505)
                            failed(res, [], err.message)
                        }
                    })
                    .catch((err)=>{
                        res.status(505)
                        response.failed(res, [], err.message)
                    })
                }
            })
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
                                tokenStatus(res, {token: token, iduser : userData.iduser}, "Login success!")
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
    },
    getAll: (req, res) => {
        try {
            const body = req.params.body
            usersModel.getAll()
            .then((result) => {
                success(res, result, 'Here are the users that data you requested')
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
            const iduser = req.params.iduser
            usersModel.getDetail(iduser)
            .then((result) => {
                success(res, result, `Here is the data of users with id=${iduser}`)
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
            upload.single('image')(req, req, (err) => {
                if(err) {
                    if(err.code === 'LIMIT_FILE_SIZE'){
                        failed(res, [], 'Image size is too big! Please upload another one with size <5mb')
                    } else {
                        failed(res, [], err)
                    }
                } else {
                    const body = req.body
                    body.image = req.file.filename
                    usersModel.insert(body)
                    .then((result) => {
                        success(res, result, 'Image is uploaded successfully')
                    })
                    .catch((err) => {
                        failed(res, [], err.message)
                    })
                }
            })
        } catch (error) {
            failed(res, [], 'Internal server error!')
        }
    },
    update: (req, res) => {
        try {
            upload.single('image')(req, res, (err) => {
                if(err){
                    if(err.code --- 'LIMIT_FILE_SIZE'){
                        failed(res, [], 'Image size is too big! Please upload another one with size <5mb')
                    } else {
                        failed(res, [], err)
                    }
                } else {
                    const iduser = req.params.iduser
                    const body = req.body
                    usersModel.getDetail(iduser)
                    .then((result) => {
                        body.image = req.file.filename
                        const oldImg = result[0].image
                        let oldName = null
                        if(!body.image) {
                            oldName = oldImg
                        } else {
                            oldName = body.image
                            fs.unlink(`src/uploads/users/${oldImg}`, (err) => {
                                if(err){
                                    failed(res, [], err.message)
                                } else {
                                    usersModel.update(body, iduser)
                                    .then((result) => {
                                        success(res, result, `User with id = ${iduser} is updated!`)
                                    })
                                    .catch((err) => {
                                        failed(res, [], err.message)
                                    })
                                }
                            })
                        }
                    })
                }
            })
        } catch (error) {
            failed(res, [], 'Internal server error!')
        }
    },
    delete: (req, res) => {
        try {
            const iduser = req.params.iduser
            usersModel.getDetail(iduser)
            .then((result) => {
                const image = result[0].image
                fs.unlink(`src/uploads/users/${image}`, (err) => {
                    if(err) {
                        failed(res, [], err.message)
                    } else {
                        usersModel.delete(iduser)
                        .then((result) => {
                            success(res, result, `User with id=${iduser} is deleted!`)
                        })
                        .catch((err) => {
                            failed(res, [], err.message)
                        })
                    }
                })
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