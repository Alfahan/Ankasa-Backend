const db = require('../configs/db')

    const location = {
        getall: () => {
            return new Promise((resolve, reject) => {
                db.query(`SELECT *FROM location`,
                (err,result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(resolve)
                    }
                })
            })
        }
    }

module.exports = location