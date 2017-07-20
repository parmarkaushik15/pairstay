'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let Amentities = new Schema({
  name: String,
  icon: String
});

module.exports = mongoose.model('Amentities', Amentities);