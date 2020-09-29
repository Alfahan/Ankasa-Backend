const locationModel = require('../models/location')
const { success, failed } = require('../helpers/response')

const upload = require('../helpers/upload')
const fs = require('fs')

    const location = {
        getall: (req,res) => {
            try {
                const country = !req.query.country ? '' : req.query.country
                const sort = !req.query.sort ? 'country' : req.query.sort
                const type = !req.query.type ? 'ASC' : req.query.type
                locationModel.getall(country, sort, type)
                .then((result) => {
                    success(res, result, 'Get All Location Success')
                }).catch((err) => {
                    failed(res, [], err.message)
                })
            } catch (error) {
                failed(res, [], 'Internal Server Error')
            }
        },
        getdetail: (req,res) => {
            try {
                const id = req.params.idlocation
                locationModel.getdetail(id)
                .then((result) => {
                    success(res, result, 'Get Detail Location Success')
                }).catch((err) => {
                    failed(res,[], err.message)
                })
            } catch (error) {
                failed(res,[], 'Internal Server Error')
            }
        },
        insert: (req,res) => {
            try {
                upload.single('imglocation')(req,res, (err) => {
                    if(err){
                        if(err.code === 'LIMIT_FILE_SIZE'){
                            failed(res, [], 'Image size is too big! Please upload another one with size <5mb')
                        }else{
                            failed(res, [], err)
                        }
                    }
                    const body = req.body
                    body.imglocation = req.file.filename
                    locationModel.insert(body)
                    .then((result) => {
                        success(res, result, 'Insert Location Success')
                    }).catch((err) => {
                        failed(res, [], err.message)
                    })
                })
            } catch (error) {
                failed(res,[], 'Internal Server Error')
            }
        },
        update: (req,res) => {
            try {
                upload.single('imglocation')(req,res, (err) => {
                    if(err){
                        if(err.code === 'LIMIT_FILE_SIZE'){
                            failed(res, [], 'Image size is too big! Please upload another one with size <5mb')
                        }else{
                            failed(res, [], err.message)
                        }
                    }
                    const id = req.params.idlocation
                    const body = req.body
                    locationModel.getdetail(id)
                    .then((result) => {
                        body.imglocation = req.file.filename
                        const oldImage = result[0].imglocation
                        let ImageName = null
                        if (!body.imglocation){
                            ImageName = oldImage
                        } else {
                            ImageName = body.imglocation

                            fs.unlink(`src/uploads/${oldImage}`, (err) => {
                                if(err){
                                    failed(res, [], err.message)
                                }else{
                                    locationModel.update(body,id)
                                    .then((results) => {
                                        success(res, results, `Data Location Updated`)
                                    }).catch((err) => {
                                        failed(res, [], err.message)
                                    })
                                }
                            })
                        }
                    }).catch((err) => {
                        failed(res, [], err.message)
                    })
                })
            } catch (error) {
                failed(res, [], `Internal Server Error`)
            }
        },
        delete: (req,res) =>{
            try {
                const id= req.params.idlocation
                locationModel.getdetail(id)
                .then((result) => {
                    const Image = result[0].imglocation
                    fs.unlink(`src/uploads/${Image}`, (err) => {
                        if(err) {
                            failed(res, [], err.message)
                        } else {
                            locationModel.delete(id)
                            .then((results) => {
                                success(res, results, `ID ${id} Deleted`)
                            }).catch((err) => {
                                failed(res, [], err.message)
                            })      
                        }
                    })     
                }).catch((err) => {
                    console.log(err)
                })
            } catch (error) {
                failed(res, [], `Internal Server Error`)
            }
        }

    } 

module.exports = location