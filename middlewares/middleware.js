// const express = require('express')

module.exports = middleWare = {
    adminCheck : (req , res , next) => {
        if(req.session.isAdmin && req.session.isLoggedIn){
            console.log('first')
            next()
        }else{
            res.redirect('/login')
        }
    },
    userCheck : (req , res , next) =>{
        if(req.session.isLoggedIn){
            console.log('is logged in : true')
            if(req.session?.isAdmin){
                res.redirect('/admin/adminPage')
            }else{
                res.redirect('/userProfile')
            }
        }else{
            next()
        }
    },
    loggedInFalse : (req , res , next) =>{
        req.session.isLoggedIn = false
        next()
    }
} 
