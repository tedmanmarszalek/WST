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

	var sculpture_object = {
		sculpture_name: req.body.sculpture_name,
		video: req.body.video,
		image: req.body.image,
		audio: req.body.audio,
		active: req.body.active,
		coordinates_latitude: req.body.coordinates_latitude,
		coordinates_longitude: req.body.coordinates_longitude,
		artist: req.body.artist,
		artist_statement: req.body.artist_statement
	}

	var sculpture = new Sculpture(sculpture_object);

	sculpture.save(function(err, result){
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
	})
})

module.exports = router;
