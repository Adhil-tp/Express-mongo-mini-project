const mongoose = require('mongoose')

const signUpSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true, trim: true },
    userMail: { type: String, required: true, unique: true, trim: true },
    userPassword: { type: String, required: true, trim: true },
    role : {default : 'user' , type : String}
})



// module.exports = mongoose.model('batches', batchSchema)
module.exports = mongoose.model('users', signUpSchema)