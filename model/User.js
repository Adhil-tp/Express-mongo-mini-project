const mongoose = require('mongoose')

const signUpSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true, trim: true },
    userMail: { type: String, required: true, unique: true, trim: true },
    userPassword: { type: String, required: true, trim: true },
    role : {default : 'user' , type : String },
    detail : {type : mongoose.Types.ObjectId}
})

const detailsSchema = new mongoose.Schema({
    age : {type : Number , trim : true  , default : undefined },
    city : {type : String , trim : true  , default : undefined },
    street : {type : String , trim : true  , default : undefined },
    pin : {type : Number , trim : true  , default : undefined },
    houseNumber : {type : Number , trim : true  , default : undefined },
})

// module.exports = mongoose.model('batches', batchSchema)

module.exports = {users : mongoose.model('users' , signUpSchema)  , details : mongoose.model('details', detailsSchema)}

