const express = require('express');
const usersController = require('../controllers/users')


const router = express.Router();

router
    .post('/register',  usersController.register)
    .post('/login', usersController.login)
    .get('/getall', usersController.getAll)
    .get('/getDetail/:iduser', usersController.getDetail)
    .post('/insert', usersController.insert)
    .patch('/update/:iduser', usersController.update)
    .delete('/delete/:iduser', usersController.delete)
module.exports = router;