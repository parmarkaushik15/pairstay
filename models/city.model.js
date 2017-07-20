'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let City = new Schema({
  name: String
});

module.exports = mongoose.model('City', City);