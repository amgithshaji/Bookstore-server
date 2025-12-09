// import express

const express = require('express')
// imported api logic from controller
const userController = require('../controller/userController')

// create router object
const router = new express.Router()

// define path of client api request
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.logincontroller)
// googlelogin
router.post('/google/sign-in',userController.googleLoginController)

module.exports = router