const airlinesModel = require('../models/airlines')
const { success, failed } = require('../helpers/response')

const upload = require('../helpers/upload')

const fs = require('fs')

    const airlines = {
        getall: (req, res) => {
            try {
                const name = !req.query.name ? '' : req.query.name
                const sort = !req.query.sort ? 'nameairlines' : req.query.sort
                const type = !req.query.type ? 'ASC' : req.query.type
                airlinesModel.getall(name, sort, type)
                .then((result) => {
                    success(res, result, 'Get All Airlines Success')
                }).catch((err) => {
                    failed(res, [], err.message)
                })            
            } catch (error) {
                failed(res, [], `Internal Server Error`)
            }
        },
        getdetail: (req, res) => {
            try {
                const id = req.params.idairlines
                airlinesModel.getdetail(id)
                .then((result) => {
                    success(res, result, 'Get Detail Airlines Success')
                }).catch((err) => {
                    failed(res, [], err.message)
                })
            } catch (error) {
                failed(res, [], 'Internal Server Error')
            }
        },
        insert: (req, res) => {
            try {
                upload.single('imgairlines')(req,res, (err) => {
                    if(err){
                        if(err.code === 'LIMIT_FILE_SIZE'){
                            failed(res, [], 'Image size is too big! Please upload another one with size <5mb')
                        }else{
                            failed(res, [], err)
                        }
                    }
                    const body = req.body
                    body.imgairlines = req.file.filename
                    airlinesModel.insert(body)
                    .then((result) => {
                        success(res, result, 'Insert Airliness Success')
                    }).catch((err) => {
                        failed(res, [], err.message)
                    })
                })
            } catch (error) {
                failed(res, [], 'Internal Server Error')
            }
        },
        update: (req,res) => {
            try {
                upload.single('imgairlines')(req,res, (err) => {
                    if(err){
                        if(err.code === 'LIMIT_FILE_SIZE'){
                            failed(res, [], 'Image size is too big! Please upload another one with size <5mb')
                        }else{
                            failed(res, [], err)
                        }
                    }
                    const id = req.params.idairlines
                    const body =  req.body
                    airlinesModel.getdetail(id)
                    .then((result) => {
                        body.imgairlines = req.file.filename
                        const oldImage = result[0].imgairlines
                        let ImageName = null 
                        if (!body.imgairlines){
                            ImageName = oldImage
                        } else {
                            ImageName = body.imgairlines
                            fs.unlink(`src/uploads/${oldImage}`,(err) => {
                                if(err){
                                    failed(res,[], err.message)
                                }else{
                                    airlinesModel.update(body,id)
                                    .then((results) => {
                                        success(res, results, `Data Airlines Update`)
                                    }).catch((err) => {
                                        failed(res, [], err.message)
                                    })
                                }
                            })
                        }
                    })
                })
            } catch (error) {
              failed(res, [], `Internal Server Error`)  
            }
        },
        delete: (req,res) => {
            try {
                const id = req.params.idairlines
                airlinesModel.getdetail(id)
                .then((result) => {
                    const Image = result[0].imgairlines
                    fs.unlink(`src/uploads/${Image}`, (err) => {
                        if(err){
                            failed(res, [], err.message)
                        }else{
                            airlinesModel.delete(id)
                            .then((results) => {
                                success(res, results, `ID ${id} Deleted`)
                            }).catch((err) => {
                                failed(res, [], err.message)
                            })
                        }
                    })
                })
            } catch (error) {
                failed(res, [], `Internal Server Error`)
            }
        }
    }

    
module.exports = airlines