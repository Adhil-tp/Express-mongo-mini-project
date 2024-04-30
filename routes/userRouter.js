const express = require('express')
const users = require('../model/User')
const userController = require('../controllers/userController')
const userRouter = express.Router()
const middleWare = require('../middlewares/middleware')



// userRouter.use(middleWare.loggedInFalse)

userRouter.get('/userProfile', userController.getUserProfile)

userRouter.get('/home', userController.getHomePage)

userRouter.get('/signup', userController.getSignUpPage)
.post('/signup', userController.registerUser)

userRouter.use(middleWare.userCheck)

userRouter.get('/login', userController.getLoginPage)
.post('/login', userController.loginUser)

userRouter.get('/userContact' , userController.getUserContact)

userRouter.get('*' , userController.fourNotFour)

// console.log(`name : ${userName}  | mail : ${userMail} | pass : ${userPassword}`)




module.exports = userRouter