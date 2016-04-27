var express = require('express');
var router = express.Router();
var fs = require('fs');
var crypto = require('crypto');
var mime = require('mime');
var jwt = require('jsonwebtoken');

var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });

var mongoose = require('mongoose');
var Advertisement = mongoose.model('Advertisement');

var fields = upload.single('image');

router.get('/', function(req, res, next){

  Advertisement.find(function(err, advertisement){
    if(err){ return next(err); }

    res.json(advertisement);
  });
});

router.post('/delete', function(req, res, next){
	var token = req.body.token;

	if(token) {
	    // verifies secret and checks exp
	    jwt.verify(token, 'UPDSECRET', function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	      		console.log('authenticated');
				Advertisement.remove({ _id: req.body.id }, function(err) {
					if(err){
						console.log(err);
						res.send(err);
					}
					else{
						console.log("deleted");
					}
				});
	      }
    	});

	  } else {

	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	    
	  }

});

router.post('/', fields, function(req, res, next){
	var token = req.body.token;

	if (token) {
	    // verifies secret and checks exp
	    jwt.verify(token, 'UPDSECRET', function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	      		console.log("got into post");
				var image = {
					name: req.body.name,
					path: "/uploads/" + req.file.filename,
					active: true
				};
				var advert_file = new Advertisement(image);

				advert_file.save(function(err, result){
					if(err){
						console.log(err);
						res.send(err);
					} 
				});

			res.send("OK");
	      }
	    });

	  } else {

	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	    
	  }

});
 
module.exports = router;