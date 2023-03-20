const Mongoose = require('mongoose')
require('./Connect')

let Schema=new Mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    phone: String,
    password: { type: String ,required: true },
    verification_code: String
})

let Model=Mongoose.model('users' , Schema)
module.exports=Model

