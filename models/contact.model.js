'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let Contact = new Schema({
  name: String,
  email:String,
  contact:String,
  message:String,
  read:String,
});

module.exports = mongoose.model('Contact', Contact);