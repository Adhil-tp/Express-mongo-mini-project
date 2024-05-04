// const express = require('express')

module.exports = middleWare = {
    adminCheck : (req , res , next) => {
        if(req.session.isAdmin && req.session.isLoggedIn){
            console.log('first')
            next()
        }else{
            res.redirect('/userProfile')
        }
    },
    userCheck : (req , res , next) =>{
        if(req.session.isLoggedIn){
            // console.log('is logged in :' , req.session.isLoggedIn )
            if(req.session?.isAdmin){
                console.log('is admin' , req.session.isAdmin)
                res.redirect('/admin/adminPage')
            }else{
                next()
            }
        }else{
            res.redirect('/home')
        }
    },
    loggedInCheck : (req , res , next) => {
        if(req.session.isLoggedIn){
            if(req.session.isAdmin){
                res.redirect('/adminPage')
            }else{
                res.redirect('/userProfile')
            }
        }else{
            next()
        }
    },
    loggedInFalse : (req , res , next) =>{
        req.session.isLoggedIn = false
        req.session.isAdmin = false
        next()
    }
} 
