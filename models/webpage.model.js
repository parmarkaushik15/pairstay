'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let page = new Schema({
    content: String,
    name:String,
    type:String
});

module.exports = mongoose.model('WebPage', page);