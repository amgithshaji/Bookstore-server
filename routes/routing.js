// import express

const express = require('express')
// imported api logic from controller
const userController = require('../controller/userController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')
const bookController = require('../controller/bookController')

// create router object
const router = new express.Router()

// define path of client api request
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.logincontroller)
// googlelogin
router.post('/google/sign-in',userController.googleLoginController)

// get home books
router.get('/books/home',bookController.getHomePageBooksController)


// ---------------authorised user-----------------
// add book - request body content is formdata
router.post('/user/book/add',jwtMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)

// get all books page
router.get('/books/all',jwtMiddleware,bookController.getuserAllBooksController)

// get all user upload pics

router.get('/user-books/all',jwtMiddleware,bookController.getuserUploadprofilePageBooksController)

// get all purchase book

router.get('/user-purchase/book',jwtMiddleware,bookController.getuserBroughtBookProfilePageController)

// get single book page
router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)


module.exports = router