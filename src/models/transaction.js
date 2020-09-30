const db = require('../configs/db')

const transaction = {
    getall: () =>{
        return new Promise((resolve,reject) => {
            db.query(`SELECT *FROM transaction`, (err,result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    booking: (data) => {
        return new Promise((resolve,reject) => {
            db.query(`INSERT INTO transaction SET ?`, data, 
            (err,result) =>{
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            } )
        })
    },
    bookingdetail: (id) => {
        return new Promise((resolve,reject) => {
            db.query(`SELECT *FROM transaction INNER JOIN users ON transaction.iduser = users.iduser INNER JOIN flight 
            ON transaction.idflight = flight.idflight INNER JOIN airlines ON flight.idairlines = airlines.idairlines WHERE idtransaction = '${id}'`,
            (err,result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            } )
        })
    },
    bookinguser: (id) =>{
        return new Promise((resolve, reject) => {
            db.query(`SELECT *FROM transaction INNER JOIN flight ON transaction.idflight = flight.idflight WHERE iduser = '${id}'`,
            (err,result) => {
                if(err) {
                    reject(new Error(err))
                }else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = transaction