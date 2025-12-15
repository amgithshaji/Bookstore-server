// import express

const express = require('express')
// imported api logic from controller
const userController = require('../controller/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const { addBookController } = require('../controller/bookController')
const multerMiddleware = require('../middleware/multerMiddleware')


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
// add book - request body content is formdata
router.post('/user/book/add',jwtMiddleware,multerMiddleware.array('uploadImages',3),addBookController,addBookController)

module.exports = router