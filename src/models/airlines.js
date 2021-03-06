const db = require('../configs/db')

    const airlines = {
        getall: (name, sort, type) => {
            return new Promise((resolve,reject) => {
                db.query(`SELECT *FROM airlines WHERE nameairlines LIKE '%${name}%' ORDER BY ${sort} ${type}`, 
                (err, result) =>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        getdetail: (id) => {
            return new Promise((resolve,reject) => {
                db.query(`SELECT *FROM airlines WHERE idairlines=${id}`,
                (err,result) => {
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        insert: (data) => {
            return new Promise((resolve,reject) => {
                db.query(`INSERT INTO airlines (nameairlines, imgairlines) VALUES ('${data.nameairlines}','${data.imgairlines}')`,
                (err,result) => {
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        update: (data,id) => {
            return new Promise((resolve, reject) => {
                db.query(`UPDATE airlines SET ? WHERE idairlines= ? `, [data,id], (err,result) => {
                    if(err) {
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        delete : (id) => {
            return new Promise((resolve,reject) => {
                db.query(`DELETE FROM airlines WHERE idairlines='${id}'`,
                (err, result) => {
                    if(err) {
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        }
    }

module.exports = airlines