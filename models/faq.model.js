'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let Faq = new Schema({
  question: String,
  answer: String
});

module.exports = mongoose.model('Faqs', Faq);