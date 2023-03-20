require('dotenv').config();
let Mongoose = require('mongoose');

let url = process.env.DB_URL;
let database = Mongoose.connect(url);
