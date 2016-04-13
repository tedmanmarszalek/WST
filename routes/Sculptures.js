var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Sculpture = mongoose.model('Sculpture');

router.get('/', function(req, res){

  Sculpture.find(function(err, sculptures){
    if(err){ return next(err); }

    res.json(sculptures);
  });
  
});

router.post('/', function(req, res){
	var token = req.body.token;

	      		console.log("authenticated");
	      		var sculpture_object = {
					sculpture_name: req.body.sculpture_name,
					video: req.body.video,
					audio: req.body.audio,
					image: req.body.image,
					active: req.body.active,
					coordinates_latitude: req.body.coordinates_latitude,
					coordinates_longitude: req.body.coordinates_longitude,
					artist: req.body.artist,
					artist_statement: req.body.artist_statement
				}

				var sculpture = new Sculpture(sculpture_object);

				//Create a new entry if no matching name found, otherwise update existing one
				var conditions = {sculpture_name:req.body.sculpture_name};
				var update = {$set: { active:req.body.active, 
						video: req.body.video,
						image: req.body.image,
						audio: req.body.audio,
						coordinates_latitude: req.body.coordinates_latitude,
						coordinates_longitude: req.body.coordinates_longitude,
						artist: req.body.artist,
						artist_statement: req.body.artist_statement}
					};
				var options = {upsert: true, new: true};

				console.log("about to enter findOneAndUpdate");
				Sculpture.findOneAndUpdate(conditions, update, options,
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
							})
						}
					}
				);
});

module.exports = router;
