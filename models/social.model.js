'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let Social = new Schema({
  name: String,
  icon: String,
  link: String
});

module.exports = mongoose.model('Social', Social);