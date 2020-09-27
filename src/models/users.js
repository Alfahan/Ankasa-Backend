const { reject } = require('lodash');
const db = require('../configs/db');

const users = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users SET ?`, data, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    login: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE email = ?`, data.email, (err, result) => {
                if (err) {
                    reject (new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }, 
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM USERS`, (err, result) => {
                if (err) {
                    reject (new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getDetail: (iduser) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE iduser ='${iduser}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (email, username, password, level, image, address ) VALUES ('${data.email}', '${data.username}', '${data.password}', '${data.level}', '${data.image}', '${data.address}')`, (err, result) => {
                if(err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    update: (data, iduser) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET ? WHERE iduser=?`, [data, iduser], (err, result) => {
                if(err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    delete: (iduser) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM users WHERE iduser = '${iduser}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
};
module.exports = users