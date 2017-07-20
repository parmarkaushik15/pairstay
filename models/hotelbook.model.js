'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let Booking = new Schema({
    hotelid:String,
    hotelname: String,
    address:String,
    city:String,
    checkin:String,
    checkout:String,
    noofguest:String,
    noofrooms:String,
    type:String,
    amount:Number,
    tax:Number,
    totalamount:Number,
    fullname:String,
    email:String,
    contact:String,
    purpose:String,
    bookingdate:{type: Date, default: new Date().getTime()}
});

module.exports = mongoose.model('Booking', Booking);