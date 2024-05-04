const commonController = {
    logoutUser : (req , res ) => {
        req.session.destroy()
        res.redirect('/login')
    }
}


module.exports  = commonController