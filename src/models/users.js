const { reject, result } = require('lodash');
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
            db.query(`SELECT * FROM users WHERE username = '${data.username}'`,  (err, result) => {
                if (err) {
                    reject (new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    logout:(id) => {
        return new Promise((resolve,reject) => {
            db.query(`UPDATE users SET refreshToken = null WHERE iduser='${id}'`,
            (err,result)=> {
                if (err) {
                    reject (new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }, 
    updateRefreshToken:(token,id) => {
        return new Promise((resolve,reject) => {
            db.query(`UPDATE users SET refreshToken='${token}' WHERE iduser='${id}'`,
            (err,result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    newPassword:(password,userkey) => {
        return new Promise((resolve,reject) => {
            db.query(`UPDATE users SET password='${password}' WHERE userkey='${userkey}'`,
            (err,result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    resetKey:(key) => {
        return new Promise((resolve,reject) => {
            db.query(`UPDATE users SET userkey= null WHERE userkey='${key}'`,
            (err,result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    updateUserKey:(userKey,email) => {
        return new Promise((resolve,reject) => {
            db.query(`UPDATE users SET userKey='${userKey}' WHERE email='${email}'`,
            (err,result) => {
                if(err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    checkRefreshToken: (refreshToken) => {
        return new Promise((resolve,reject)=>{
            db.query(`SELECT *FROM users WHERE refreshToken='${refreshToken}'`, 
            (err,result) =>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })  
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users INNER JOIN location on users.idlocation = location.idlocation`, (err, result) => {
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
    },
    getUsers: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET active = 1 WHERE email= '${data}'`, (err,result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    getEmailUsers: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *FROM users WHERE email='${email}'`, (err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    if(result.length > 0){
                        resolve(result)
                    }else{
                        reject(`Email tidak ditemukan`)
                    }
                }
            })
        })
    }
};
module.exports = users