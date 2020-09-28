const db = require('../configs/db')

const flight = {
    getAll: () => {
        return new Promise ((resolve, reject) => {
            db.query(`SELECT * FROM flight`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getDetail: (idflight) => {
        return new Promise((resolve,reject) => {
            db.query(`SELECT * FROM flight WHERE idflight='${idflight}'`, (err, result) => {
                if (err) {
                    reject(new Error(er))
                } else {
                    resolve(result)
                }
            })
        })
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO flight (
                idflight,
                fromcountry, 
                fromcity,
                tocountry,
                tocity,
                flighttype,
                departureday,
                totalseat,
                class,
                direct,
                transit,
                transit2,
                luggage,
                meal,
                wifi,
                departuretime,
                timearrived,
                price,
                terminal,
                gate,
                idairlines
                ) VALUES (
                    '${data.idflight}',
                    '${data.fromcountry}',
                    '${data.fromcity}',
                    '${data.tocountry}',
                    '${data.tocity}',
                    '${data.flighttype}',
                    '${data.departureday}',
                    '${data.totalseat}',
                    '${data.class}',
                    '${data.direct}',
                    '${data.transit}',
                    '${data.transit2}',
                    '${data.luggage}',
                    '${data.meal}',
                    '${data.wifi}',
                    '${data.departuretime}',
                    '${data.timearrived}',
                    '${data.price}',
                    '${data.terminal}',
                    '${data.gate}',
                    '${data.idairlines}'
                    
                    
                )`, (err,result) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    update: (data, idflight) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE flight SET ? WHERE idflight=?`, [data, idflight], (err, result) => {
                if(err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    delete: (idflight) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM flight WHERE idflight='${idflight}'`, (err, result) => {
                if(err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = flight