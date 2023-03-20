const Mongoose  = require('mongoose');
require('./Connect');

let Schema = new Mongoose.Schema({
  user_id: String,
  name: String,
  address: String,
  zipcode: String,
  city: String,
  country: String,
  regnum: String,
  phone: String,
  area: String,
  secretcode: String,
  billing_id: String,
  end_date: { type: Date },
  active: { type: Boolean, default: false }
});

let Model = Mongoose.model('stores' , Schema);
module.exports = Model;
