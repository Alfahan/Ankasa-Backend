const express = require('express');
const usersController = require('../controllers/users')
const { authenticate, authorize } = require('../helpers/auth')

const router = express.Router();

router
    .post('/register',  usersController.register)
    .post('/login', usersController.login)
    .get('/getall', authenticate, authorize, usersController.getAll)
    .get('/getDetail/:iduser', authenticate, authorize, usersController.getDetail)
    .post('/insert', authenticate, authorize, usersController.insert)
    .patch('/update/:iduser', authenticate, authorize, usersController.update)
    .delete('/delete/:iduser', authenticate, authorize, usersController.delete)
    .get('/verify/:token', usersController.verify)
    .post('/refreshToken', authenticate, authorize, usersController.renewToken)
    .post('/logout/:iduser',authenticate, authorize, usersController.logout)

module.exports = router;