const express = require('express')
const users = require('../model/User')

module.exports = userController = {

    // register user
    registerUser : (req, res) => {
        try {
            const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[^ ]{8,20}$/;
            const emailRegex = /^[a-zA-Z0-9]{5,30}@[a-zA-Z]{2,7}.[a-zA-Z]{1,5}$/;
            // console.log(JSON.stringify(req.body));
            console.log(req.body)
            const { userName, userMail, userPassword, confirmPass } = req.body
    
    
            async function checkUserExist(name, email) {
                let findingUser = await users.find({ $or: [{ userName: name }, { userMail: email }] }).count()
                // let findingUser = await users.aggregate([{ $project: { $cont: { if: { $eq: ["$userName", name] } }, then: { name: 1 } } }])
                console.log(findingUser)
                return findingUser > 0
            }
    
            checkUserExist(userName, userMail).then(async (result) => {
                console.log(result)
                req.session.error = {}
                if (result) {
                    console.log('user duplicate found')
                    console.log(result)
                    req.session.error.duplicateFound = "user with same credential exists"
                    return res.redirect('/signup')
                }
    
    
                if (userName.length <= 2) {
                    req.session.error.nameError = "name must contain minimum 3 letters"
                    console.log('name is wrong')
                    // return res.redirect("/signup")
                }
                if (!emailRegex.test(userMail)) {
                    req.session.error.mailError = "This field must be in a email format"
                    console.log('email is wrong')
                    // return res.redirect("/signup")
                }
                if (!passRegex.test(userPassword)) {
                    console.log('pass is wrong')
                    req.session.error.passError = "Must contain 1 Upper case, 1 lower case, 1 number, 1 special charater"
                    // return res.redirect("/signup")
                }
                if (userPassword != confirmPass) {
                    console.log('c pass is wrong')
                    req.session.error.cPassError = "must match the previous field"
                    // return res.redirect("/signup")
                }
    
                console.log('error array', Object.keys(req.session.error))
                if (Object.keys(req.session.error).length > 0) {
                    console.log('redirecting to signup')
                    return res.redirect('/signup')
                }
                req.body.userName = req.body.userName.toLowerCase().trim()
                req.body.userMail = req.body.userMail.toLowerCase().trim()
                console.log('reached the adding area')
                let newUser = new users(req.body)
                await newUser.save()
                if (newUser) {
                    req.session.user = {
                        userId: newUser._id,
                        userName: newUser.userName
                    }
                }
                res.redirect('/home')
    
            })
        } catch (err) {
            console.log('this' ,err.message)
        }
        // res.redirect('/signup')
    },

    // Login user
    loginUser : (req, res) => {
        console.log('this is body', req.body)
        let { loginCredential, loginPassword } = req.body
        async function findUser(cred) {
            const foundedUser = await users.find({ $or: [{ userName: { $regex: new RegExp(`^${cred}$` , 'i') } }, { userMail: { $regex: new RegExp(`^${cred}$` , 'i') } }] })
            // const foundedUser  = await cursor.toArray()
            // console.log('hey' ,typeof foundedUser)
            return foundedUser  
        }
    
        findUser(loginCredential.trim()).then(data => {
            // console.log('db type' , typeof data[0].userPassword)
            // console.log('name ' ,data[0])
            req.session.error = {}
            if (data.length == 0) {
                req.session.error.userNotFound = "user with the given details doesn't found"
                console.log(data)
                return res.redirect('/login')
            } else {
                // if()
                if (loginPassword == data[0].userPassword) {
                    req.session.isLoggedIn = true
                    // checking if the logged one is admin or user
                    if(data[0].role == 'admin'){
                        req.session.isAdmin = true
                        return res.redirect('/admin/adminPage')
                    }else{
                        // req.session.isAdmin = false
                        return res.redirect('/userProfile')
                    }
                } else {    
                    req.session.error.incorrectPass = "Sorry the password you entered is incorrect."
                    return res.redirect('/login')
                }
            }
        }).catch(err => console.log(err))
        // console.log('prrr' , LoginCredential , loginPassword)
    
        // res.send('welcome')
    },

    //getLogin page
    getLoginPage : (req, res) => {
        try {
            let error = req.session.error
            req.session.error = ''
            res.render('login', { error })
        } catch (err) {
            console.log(err.message)
        }
    },
    
    //get home page
    getHomePage : async (req, res) => {
        try {
            let user = req.session.user
            req.session.user = ''
            res.render('home', { user })
        } catch (err) {
            console.log(err)
            res.json("something went wrong")
        }
    },
    
    //get sign up   
    getSignUpPage : (req, res) => {
        try {
            let error = req.session.error
            req.session.error = undefined
            console.log('reached the signup')
            res.render('signup', { title: "signup", error })
        } catch (err) {
            console.log('session error ' + err.message)
        }
    },
    
    //get user profile
    getUserProfile :  (req , res) => {
        res.render('userProfile')
    },

    //user Contact 
    getUserContact : (req , res) => {
        res.redirect('login')
    },


    //404

    fourNotFour : (req , res) => {
        res.render('fourNotFour')
    }


}








// function middle (){
//     if(!isLoggedIn){
//         next()
//     }else{
//         res.redirect('/home')
//     }
// }
