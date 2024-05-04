const express = require('express')
const adminController = require('../controllers/adminController')
const adminRouter = express.Router()
const middleWare = require('../middlewares/middleware')


adminRouter.use(middleWare.adminCheck)

adminRouter.get('/adminPage' , adminController.adminPage )

adminRouter.get('/adminContact' , adminController.adminContact)




module.exports = adminRouter