'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let Hotel = new Schema({
  hotelId: Number,
  hotelName: String,
  email: String,
  city: String,
  addressOne: String,
  star:Number,
  addressTwo: String,
  mapSource: String,
  imgfolder: [],
  lat: {type: Number, default: null},
  lng: {type: Number, default: null},
  price: Number,
  priceTwo: Number,
  amentities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Amentities'
    }],
  about: String,
  policy: String,
  isfeatured:{type: Boolean, default: false},
  islocal:{type: Boolean, default: false},
  space: {
    checkIn: {type: String, default: '12 pm'},
    checkOut: {type: String, default: '12 pm'},
  }
});

module.exports = mongoose.model('Hotel', Hotel);