const locationModel = require('../models/location')
const { success, failed } = require('../helpers/response')

const upload = require('../helpers/uploadlocation')
const fs = require('fs')

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
                            failed(res, [], 'file size is too large')
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
        delete: (req,res) =>{
            try {
                const id= req.params.idlocation
                locationModel.getdetail(id)
                .then((result) => {
                    const Image = result[0].imglocation
                    fs.unlink(`src/uploads/locations/${Image}`, (err) => {
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
                failed(rea, [], `Internal Server Error`)
            }
        }

    } 

module.exports = location