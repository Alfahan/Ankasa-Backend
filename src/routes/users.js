const express = require('express');
const usersController = require('../controllers/users')
const { authenticate, authorize } = require('../helpers/auth')

const router = express.Router();

router
    // Register
    .post('/register',  usersController.register)
    // Login
    .post('/login', usersController.login)
    // Insert
    .post('/insert', authenticate, authorize, usersController.insert)
    // Refresh Token
    .post('/refreshToken', usersController.renewToken)
    // Logout
    .post('/logout/:iduser', usersController.logout)
    // Forgot Password
    .post('/ForgotPassword', usersController.ForgotPassword)
    // Send New Password
    .post('/newPassword/:userkey', usersController.newPassword)
    // Verify Token
    .get('/verify/:token', usersController.verify)
    // Get All
    .get('/getall', authenticate, authorize, usersController.getAll)
    // Get All Detail
    .get('/getDetail/:iduser', authenticate, authorize, usersController.getDetail)
    // Update 
    .patch('/update/:iduser', authenticate, authorize, usersController.update)
    // Delete
    .delete('/delete/:iduser', authenticate, authorize, usersController.delete)
    
module.exports = router;