const Mongoose  = require('mongoose')
require('./Connect')

let Schema=new Mongoose.Schema({
    store_id: String,
    email: String,
    phone: String,
    rating: Number,
    review: String,
    date: { type: Date, default: Date.now },
    verified: { type: Boolean, default: false },
    verification_code: String
})

let Model=Mongoose.model('reviews' , Schema)
module.exports=Model

