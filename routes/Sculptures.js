var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Sculpture = mongoose.model('Sculpture');

router.get('/', function(req, res){
	res.send("Hello")
});

router.post('/', function(req, res){

	var sculpture_object = {
		name: req.body.name,
		video: req.body.video,
		image: req.body.image,
		audio: req.body.audio,
		active: req.body.active,
		coordinates: req.body.coordinates,
		artist: req.body.artist,
		artist_statement: req.body.artist_statement
	}

	var sculpture = new Sculpture(sculpture_object);
	sculpture.save(function(err, result){
		if(err){
			console.log(err);
			console.log("Error");
			console.log(result);
			res.json({
					success: false,
					msg: "Something went wrong."
				})
		} else {
			console.log(result);
			res.json({
				success: true,
				msg: ""
			})
		}
	})
})

module.exports = router;
