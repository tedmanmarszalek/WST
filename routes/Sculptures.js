var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
var Sculpture = mongoose.model('Sculpture');

router.get('/', function(req, res){

  Sculpture.find(function(err, sculptures){
    if(err){ return next(err); }

    res.json(sculptures);
  });
  
});

router.post('/', function(req, res, next){
	var token = req.body.token;
	if (token) {
	    // verifies secret and checks exp
	    jwt.verify(token, 'UPDSECRET', function(err, decoded) {    
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	      		var number, coordinates_longitude, coordinates_latitude;

	      		if(req.body.number === undefined || req.body.number === null)
	      			number = 0;
	      		else
	      			number = req.body.number;
      			if(req.body.coordinates_latitude === undefined || req.body.coordinates_latitude === null)
      				coordinates_latitude = 0;
      			else
      				coordinates_latitude = req.body.coordinates_latitude;
      			if(req.body.coordinates_longitude === undefined || req.body.coordinates_longitude === null)
      				coordinates_longitude = 0;
      			else
      				coordinates_longitude = req.body.coordinates_longitude;

	      		var sculpture_object = {
					sculpture_name: req.body.sculpture_name,
					active: req.body.active,
					coordinates_latitude: coordinates_latitude,
					coordinates_longitude: coordinates_longitude,
					artist: req.body.artist,
					artist_statement: req.body.artist_statement, 
					type: req.body.type, 
					number: number, 
					location: req.body.location
				};
				console.log("Created new sculpture object");
				var sculpture = new Sculpture(sculpture_object);
				sculpture.save(function (err) {
					if(err) {
						console.log(err);
						res.send(err);
					}	
					else{
						console.log("Sculpture saved");
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

router.post('/edit', function(req, res, next){
	var token = req.body.token;
	if (token) {
	    // verifies secret and checks exp
	    jwt.verify(token, 'UPDSECRET', function(err, decoded) {    
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	      		var number, coordinates_longitude, coordinates_latitude;

	      		if(req.body.number === undefined || req.body.number === null)
	      			number = 0;
	      		else
	      			number = req.body.number;
      			if(req.body.coordinates_latitude === undefined || req.body.coordinates_latitude === null)
      				coordinates_latitude = 0;
      			else
      				coordinates_latitude = req.body.coordinates_latitude;
      			if(req.body.coordinates_longitude === undefined || req.body.coordinates_longitude === null)
      				coordinates_longitude = 0;
      			else
      				coordinates_longitude = req.body.coordinates_longitude;

				//Create a new entry if no matching name found, otherwise update existing one
				var update = {$set: { 
						sculpture_name: req.body.sculpture_name,
						active:req.body.active, 
						coordinates_latitude: coordinates_latitude,
						coordinates_longitude: coordinates_longitude,
						coordinates_latitude: req.body.coordinates_latitude,
						coordinates_longitude: req.body.coordinates_longitude,
						artist: req.body.artist,
						artist_statement: req.body.artist_statement, 
						type: req.body.type,
						number: number,
						location: req.body.location
						}
					};
				var options = {upsert: false, new: true};

				Sculpture.findByIdAndUpdate(req.body.selectedId, update, options,
					function(err, result){
						if(err){
							console.log(err);
							res.send(err);
						} else {
							console.log("result is " + result);
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

	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	  }
});

module.exports = router;
