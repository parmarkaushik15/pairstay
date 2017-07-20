'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let blog = new Schema({
    content: String,
    name:String,
    postdate:Date,
    tags:String,
    imageurl:String,
    comment:[]
});
module.exports = mongoose.model('Blog', blog);