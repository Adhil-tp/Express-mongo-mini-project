const express = require('express')
const users = require('../model/User')
const userController = require('../controllers/userController')
const userRouter = express.Router()
const middleWare = require('../middlewares/middleware')



// userRouter.use(middleWare.loggedInFalse)

userRouter.get('/home', userController.getHomePage)

userRouter.get('/signup', middleWare.loggedInCheck , userController.getSignUpPage)
.post('/signup', userController.registerUser)


userRouter.get('/login', middleWare.loggedInCheck , userController.getLoginPage)
.post('/login', userController.loginUser)

userRouter.use(middleWare.userCheck)

userRouter.get('/showDetails' , userController.showDetails)

userRouter.put('/updateUserDetails' , userController.updateUserDetails)

userRouter.post('/updateProfile' , userController.updateUserProfile)

userRouter.get('/userProfile' , userController.getUserProfile)


userRouter.get('/userContact' , userController.getUserContact)

// userRouter.get('/showProfile' , userController.showProfile)

userRouter.get('*' , userController.fourNotFour)

// console.log(`name : ${userName}  | mail : ${userMail} | pass : ${userPassword}`)




module.exports = userRouter