var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })
var mongoose = require('mongoose');
var Sculpture = mongoose.model('Sculpture');
var File = mongoose.model('File');

router.get('/', function(req, res){
	res.send("Hello")
});

router.post('/', upload.fields([{name: "image", maxcount: 1}, {name: "audio", maxcount: 1}, {name: "video", maxcount: 1}]), function(req, res, next){
	var sculpture_name = req.body.sculpture_name;

	var image = {
		file_name: req.image.filename,
		path: req.image.destination + req.image.filename,
		associated_sculpture: sculpture_name,
		type: "image"
	};

	var audio = {
		file_name: req.audio.filename,
		path: req.audio.destination + req.audio.filename,
		associated_sculpture: sculpture_name,
		type: "audio"
	};

	var video = {
		file_name: req.video.filename,
		path: req.video.destination + req.video.filename,
		associated_sculpture: sculpture_name,
		type: "video"
	};

	var image_file = new File(image);
	var audio_file = new File(audio);
	var video_file = new File(video);

	image_file.save(function(err, result){
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
	});

	audio_file.save(function(err, result){
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
	});

	video_file.save(function(err, result){
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
	});

	Sculpture.update({sculpture_name: sculpture_name}, {$set: { image: image.path, audio: audio.path, video: video.path}}, function(err, result){
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
		};
	});

});

module.exports = router;