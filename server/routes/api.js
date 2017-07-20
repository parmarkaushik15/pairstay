const express = require('express');
const router = express.Router();
const multer = require("multer");
var request= require('request');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var City = require('../../models/city.model');
var Hotel = require('../../models/hotel.model');
var Amentities = require('../../models/amentities.model');
var WebPage = require('../../models/webpage.model');
var Testimonial = require('../../models/testimonial.model');
var Faq = require('../../models/faq.model');
var Contact = require('../../models/contact.model');
var Social = require('../../models/social.model');
var Booking = require('../../models/hotelbook.model');
var Blog = require('../../models/blog.model');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'support@pairstay.com ',
        pass: 'technic@l2010'
    }
});

var storagedata = multer.diskStorage({ //multers disk storage settings
      destination: function (req, file, cb) {
          cb(null, 'src/uploads');
      },
      filename: function (req, file, cb) {
          var datetimestamp = Date.now();
          cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
      }
  });
  var upload = multer({storage: storagedata}).array("uploads", 12);

router.post('/upload', function(req, res) {
    upload(req,res,function(err){
        console.log(req.file);
        if(err){
              res.json({error_code:1,err_desc:err});
              return;
        }
        res.json(req.files);
    });
});


router.get('/social/', (req, res) => {
    Social.find().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
    });
});

router.post('/social/createorupdate', (req, res) => {
  req.body._id = req.body._id || new mongoose.mongo.ObjectID();
  Social.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, upsert: true}, (err, data) => {
    if (err)
      return console.log(err);
    res.status(200).json({
      'message':'Social Create Sucessfully',
      'code':'ERR200'
    });
  });
});

router.post('/social/delete', (req, res) => {
  Social.remove({_id: req.body.id}, err => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'Social Delete Sucessfully',
      'code':'ERR200'
    });
  })
});


router.get('/contact/', (req, res) => {
    Contact.find().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
    });
});

router.get('/contact/unread/', (req, res) => {
    Contact.find({read:"N"}).exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
    });
});


router.post('/contact/createorupdate', (req, res) => {
  req.body._id = req.body._id || new mongoose.mongo.ObjectID();


  var mailOptions = {
      from: `${req.body.name}+  <support@pairstay.com>`, // sender address (who sends)
      to: 'parmarkaushik15@gmail.com', // list of receivers (who receives)
      subject: 'contact us form', // Subject line
      text: req.body.message, // plaintext body
      html: 'this is my email:' + req.body.email // html body
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }

      console.log('Message sent: ' + info.response);
  });
    

  Contact.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, upsert: true}, (err, data) => {
    if (err)
      return console.log(err);
    res.status(200).json({
      'message':'Contact Create Sucessfully',
      'code':'ERR200'
    });
  });
});

router.post('/contact/delete', (req, res) => {
  Contact.remove({_id: req.body.id}, err => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'Contact Delete Sucessfully',
      'code':'ERR200'
    });
  })
});


router.get('/faq/', (req, res) => {
    Faq.find().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
    });
});

router.post('/faq/createorupdate', (req, res) => {
  req.body._id = req.body._id || new mongoose.mongo.ObjectID();
  Faq.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, upsert: true}, (err, data) => {
    if (err)
      return console.log(err);
    res.status(200).json({
      'message':'Faq Create Sucessfully',
      'code':'ERR200'
    });
  });
});

router.post('/faq/delete', (req, res) => {
  Faq.remove({_id: req.body.id}, err => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'Faq Delete Sucessfully',
      'code':'ERR200'
    });
  })
});



router.get('/testimonial/', (req, res) => {
    Testimonial.find().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
    });
});

router.post('/testimonial/createorupdate', (req, res) => {
  req.body._id = req.body._id || new mongoose.mongo.ObjectID();
  Testimonial.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, upsert: true}, (err, data) => {
    if (err)
      return console.log(err);
    res.status(200).json({
      'message':'Testimonial Create Sucessfully',
      'code':'ERR200'
    });
  });
});

router.post('/testimonial/delete', (req, res) => {
  Testimonial.remove({_id: req.body.id}, err => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'Testimonial Delete Sucessfully',
      'code':'ERR200'
    });
  })
});


router.get('/webpages/', (req, res) => {
    WebPage.find().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
    });
});

router.post('/webpages/pagebytype', (req, res) => {
    WebPage.find({'type': req.body.type}).exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
    });
});

router.post('/webpages/createorupdate', (req, res) => {
  req.body._id = req.body._id || new mongoose.mongo.ObjectID();
  WebPage.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, upsert: true}, (err, data) => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'WebPage Create Sucessfully',
      'code':'ERR200'
    });
  });
});

router.get('/blogs/', (req, res) => {
    Blog.find().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
    });
});

router.post('/blogs/getbyid', (req, res) => {
    ids = req.body.ids;
   
    Blog.find({'_id': ids}).exec((err, data) => {
        if (err)
          return console.log(err);
        
        res.status(200).json({
          'message':'Fetch Successfully',
          'code':'ERR200',
          'content':data
        });
    });
})

router.post('/blogs/createorupdate', (req, res) => {
  req.body._id = req.body._id || new mongoose.mongo.ObjectID();
  Blog.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, upsert: true}, (err, data) => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'Blog Create Sucessfully',
      'code':'ERR200'
    });
  });
});

router.post('/blogs/delete', (req, res) => {
  Blog.remove({_id: req.body.id}, err => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'Blog Delete Sucessfully',
      'code':'ERR200'
    });
  })
});



router.get('/amentities/', (req, res) => {
    Amentities.find().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
    });
});



router.post('/amentities/getamentitiebyid', (req, res) => {
    var ids = [];
    ids = req.body.ids;
    var reqid = [];
    for(i = 0;i<ids.length;i++){
        reqid.push(mongoose.Types.ObjectId(ids[i]))
    }

    Amentities.find({'_id': { $in: reqid }}).exec((err, data) => {
        if (err)
          return console.log(err);
        
        res.status(200).json({
          'message':'Fetch Successfully',
          'code':'ERR200',
          'content':data
        });
    });
})

router.post('/amentities/createorupdate', (req, res) => {
  req.body._id = req.body._id || new mongoose.mongo.ObjectID();
  Amentities.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, upsert: true}, (err, data) => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'Amentities Create Sucessfully',
      'code':'ERR200'
    });
  });
});

router.post('/amentities/delete', (req, res) => {
  Amentities.remove({_id: req.body.id}, err => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'Amentities Delete Sucessfully',
      'code':'ERR200'
    });
  })
});

router.get('/city/', (req, res) => {
  City.find().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
    });
});

router.post('/city/createorupdate', (req, res) => {
  req.body._id = req.body._id || new mongoose.mongo.ObjectID();
  City.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, upsert: true}, (err, data) => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'City Create Sucessfully',
      'code':'ERR200'
    });
  });
});

router.post('/city/delete', (req, res) => {
  City.remove({_id: req.body.id}, err => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'City Delete Sucessfully',
      'code':'ERR200'
    });
  })
});

router.get('/hotel/', (req, res) => {
  Hotel.find().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
  });
});

router.get('/hotel/getfeatured', (req, res) => {
  Hotel.find({'isfeatured':true}).exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
  });
});
router.post('/hotel/pricesort', (req, res) => {
  req.body.city = req.body.city || '';
  if(req.body.city == 'Destination'){
    Hotel.find({ "priceTwo": { "$gte": req.body.start, "$lte": req.body.end }}).sort({price:1}).exec((err, data) => {
        res.status(200).json({
          'message':'Fetch Successfully',
          'code':'ERR200',
          'content':data
        });
    });
  }else{
    
     Hotel.find({$and:[{city:req.body.city},{ "priceTwo": { "$gte": req.body.start, "$lte": req.body.end }}]}).sort({price:1}).exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
  });
  }
});


router.post('/hotel/localsort', (req, res) => {
  req.body.city = req.body.city || '';
  console.log(req.body.city)
  if(req.body.city == 'Destination'){
  Hotel.find({$and:[{islocal:true},{ "priceTwo": { "$gte": req.body.start, "$lte": req.body.end }}]}).sort().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
  });
  }else{
    Hotel.find({$and: [{city:req.body.city},{islocal:true}, { "priceTwo": { "$gte": req.body.start, "$lte": req.body.end }}]}).sort().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
  });
  }
});


router.post('/hotel/starsort', (req, res) => {
  req.body.city = req.body.city || '';
  console.log(req.body.city)
  if(req.body.city == 'Destination'){
    Hotel.find({ "priceTwo": { "$gte": req.body.start, "$lte": req.body.end }}).sort({star:1}).exec((err, data) => {
        res.status(200).json({
          'message':'Fetch Successfully',
          'code':'ERR200',
          'content':data
        });
    });
  }else{
    Hotel.find({$and:[{city:req.body.city},{ "priceTwo": { "$gte": req.body.start, "$lte": req.body.end }}]}).sort({star:1}).exec((err, data) => {
        res.status(200).json({
          'message':'Fetch Successfully',
          'code':'ERR200',
          'content':data
        });
    });
  }
});


router.post('/hotel/cityhotel', (req, res) => {
  req.body.city = req.body.city || '';
  Hotel.find({city:req.body.city}).exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
  });
});

router.post('/hotel/hotelinfo', (req, res) => {
  Hotel.find({'_id':req.body._id}).sort().exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
  });
});

router.post('/hotel/createorupdate', (req, res) => {
  req.body._id = req.body._id || new mongoose.mongo.ObjectID();
  Hotel.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, upsert: true}, (err, data) => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'Hotel Create Sucessfully',
      'code':'ERR200'
    });
  });
});

router.get('/hotelbook/', (req, res) => {
  Booking.find().sort({'bookingdate':1}).exec((err, data) => {
      res.status(200).json({
        'message':'Fetch Successfully',
        'code':'ERR200',
        'content':data
      });
  });
});

router.post('/hotelbook/createorupdate', (req, res) => {
  req.body._id = req.body._id || new mongoose.mongo.ObjectID();
  Booking.findOneAndUpdate({_id: req.body._id}, req.body, {new: true, upsert: true}, (err, data) => {
    if (err)
      return console.log(err);

  var mailOptions = {
    from: `'pairstay.com' +  <support@pairstay.com>`, // sender address (who sends)
    to: 'satish.kkv@gmail.com', // list of receivers (who receives)
    subject: 'payment', // Subject line
    text: 'payment info', // plaintext body
    html: `<b>${req.body.email} paid Rs.${req.body.totalamount} towards a hotel booking at the ${req.body.hotelname}, booking id is ${req.query.payment_id} and his email is ${req.body.email}, and phone no. is ${req.body.contact}</b><br>` // html body
  }
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
  });
   var mailOptions2 = {
    from: `Pairstay.com  <support@pairstay.com>`, // sender address (who sends)
    to: `${req.body.email}`, // list of receivers (who receives)
    subject: 'Booking confirmation', // Subject line
    text: 'Booking info', // plaintext body
    html: `<b>Dear ${req.body.fullname},</b><br><p>Thank you for choosing to stay with pairstay at ${req.body.hotelname}. We are pleased to confirm your reservation as follows:</p> <br> <b>Hotel Name: ${req.body.hotelname}<br> Address: ${req.body.address}<br> Booking ID:${req.query.payment_id} <br>checkIn: ${req.body.checkin}<br> checkOut: ${req.body.checkout}<br> Room Details: ${req.body.noofrooms} rooms, ${req.body.noofguest} guests <br> Tarrif: ${req.body.amount}<br> Total amount: ${req.body.totalamount} <br> Payment status: successful<br> </b><br> <p>Please Note:</p> <p>All guests need to carry their govt id at the time of check in. </p><p>Pan card not accepted</p><br><b>Contact Us:</b><br><p>Email: support@pairstay.com</p><p> Phone: +91-7827449562</p>` // html body
};

  transporter.sendMail(mailOptions2, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    });
 
    res.status(200).json({
      'message':'HotelBook Create Sucessfully',
      'code':'ERR200'
    });
  });
});

router.post('/hotel/payment', (req, res) => {
 console.log(req.body);
    var details2 = {name: req.body.fullname, email: req.body.email, amount:req.body.totalamount, phone: req.body.contact};
    var headers = { 'X-Api-Key': 'd82016f839e13cd0a79afc0ef5b288b3', 'X-Auth-Token': '3827881f669c11e8dad8a023fd1108c2'}
    var payload ={
      purpose: req.body.purpose,
      amount: req.body.totalamount,
      phone: req.body.contact,
      buyer_name: req.body.fullname,
      redirect_url: 'http://192.168.43.54:3001/success',
      send_email: false,
      webhook: 'http://192.168.43.54:3001/instahook',
      send_sms: false,
      email: req.body.email,
      allow_repeated_payments: false}

    request.post('https://test.instamojo.com/api/1.1/', {form: payload,  headers: headers}, function(error, response, body){
        var bodyObject = JSON.parse(body);
        console.log(bodyObject);
        res.status(200).json({
          'message':'Fetch Successfully',
          'code':'ERR200',
          'content':bodyObject
      });
      
   });
});

router.post('/hotel/success', function(req, res, next){

  res.render('success' , {id: req.query.payment_id});
});

router.post('/hotel/delete', (req, res) => {
  Hotel.remove({_id: req.body.id}, err => {
    if (err)
      return console.log(err);

    res.status(200).json({
      'message':'Hotel Delete Sucessfully',
      'code':'ERR200'
    });
  })
});

router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;