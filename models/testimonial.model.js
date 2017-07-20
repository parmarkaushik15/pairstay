'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let testimonial = new Schema({
    imageUrl: {type: String, default: ''},
    testimonialName:String,
    testimonialContent:String
});

module.exports = mongoose.model('Testimonial', testimonial);