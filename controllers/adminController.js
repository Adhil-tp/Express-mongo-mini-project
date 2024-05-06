const express = require('express')
const {users , details} = require('../model/User')


module.exports = adminController =  {

    adminPage : async(req , res) =>{
        try{
            const adminId = req.session.adminId
            const adminDetails = await users.findOne({_id : adminId}) 
            console.log(adminDetails)
            res.render('adminPage' , {adminDetails})
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