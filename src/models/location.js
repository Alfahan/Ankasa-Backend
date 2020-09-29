const db = require('../configs/db')

    const location = {
        getall: (country, sort, type) => {
            return new Promise((resolve, reject) => {
                db.query(`SELECT *FROM location WHERE country LIKE '%${country}%' ORDER BY ${sort} ${type}`,
                (err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        getdetail: (id) => {
            return new Promise((resolve, reject) => {
                db.query(`SELECT *FROM location WHERE idlocation=${id}`,
                (err,result) => {
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        insert : (data) =>{
            return new Promise((resolve,reject) => {
                db.query(`INSERT INTO location (country, city, postcode,imglocation) VALUES ('${data.country}','${data.city}','${data.postcode}','${data.imglocation}')`,
                (err, result) => {
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            })
        },
        update : (data, id) => {
            return new Promise((resolve,reject) => {
                db.query(`UPDATE location SET ? WHERE idlocation= ?`, [data,id], (err,result) => {
                    if (err) {
                        reject(new Error(err))
                    }else (
                        resolve(result)
                    )
                })
            })
        },
        delete : (id) => {
            return new Promise((resolve,reject) => {
                db.query(`DELETE FROM location WHERE idlocation='${id}' `,
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

module.exports = location