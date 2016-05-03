var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
var Intro = mongoose.model('Intro');

router.get('/', function(req, res){

  Intro.find(function(err, intro){
    if(err){ return next(err); }
    res.json(intro);
  });
  
});

router.post('/', function(req, res){
	var token = req.body.token;
	if(token) {
	    // verifies secret and checks exp
	    jwt.verify(token, 'UPDSECRET', function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
				var update = {$set: { text:req.body.text } };
				var options = {upsert: false, new: true};

				Intro.findByIdAndUpdate(req.body.id, update, options,
					function(err, result){
						if(err){
							console.log(err);
							res.send(err);
						} else {
							console.log(result);
							console.log("Success");
							res.json({
								success: true,
								msg: ""
							});
						}
					}
				);
	      }
    	});

	  } else {
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	    
	  }
});

router.post('/default', function(req, res){
	var token = req.body.token;
	if(token) {
	    // verifies secret and checks exp
	    jwt.verify(token, 'UPDSECRET', function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	      		var intro_object = {
	      			text: "Welcome to the Wandell Sculpture Garden, open daily sunrise to sunset and free to the public. The garden opened in 1999. An initial gift from the Celia and Willet Wandell Family made it possible to install 10 sculptures that were on loan from the artist. Since then many others have helped the district purchase grow the collection. Most of the exhibits remain pieces that are on two-year loan from the artist and are available for purchase. This tour will help you explore each piece and learn more about the artists who created them. Just click start to begin."
				};
				var intro = new Intro(intro_object);

				intro.save(function (err) {
					if(err) {
						console.log(err);
						res.send(err);
					}	
				});

	      }
    	});

	  } else {
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	    
	  }
});
module.exports = router;
