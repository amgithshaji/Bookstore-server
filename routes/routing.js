// import express

const express = require('express')
// imported api logic from controller
const userController = require('../controller/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const { addBookController } = require('../controller/bookController')

// create router object
const router = new express.Router()

// define path of client api request
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.logincontroller)
// googlelogin
router.post('/google/sign-in',userController.googleLoginController)

// ---------------authorised user-----------------
// add book
router.post('/user/book/add',jwtMiddleware,addBookController,addBookController)

module.exports = router