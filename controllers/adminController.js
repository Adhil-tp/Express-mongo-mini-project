const express = require('express')


module.exports = adminController =  {

    adminPage : (req , res) =>{
        try{
            res.render('adminPage')
        }catch(err){
            console.log(err.message)
        }
    }, 
    adminContact : (req  , res ) => {
        try{
            res.render('adminContact')
        }catch(err){
            console.log(err.message)
        }
    }
}