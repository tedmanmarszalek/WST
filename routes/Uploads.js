var express = require('express');
var router = express.Router();
var fs = require('fs');

var multer = require('multer')
var upload = multer({ dest: './uploads/' })

var mongoose = require('mongoose');
var Sculpture = mongoose.model('Sculpture');
var File = mongoose.model('File');

router.get('/', function(req, res){
	res.send("Hello")
});

var fields = upload.fields([{name: 'image', maxcount: 1}, {name: 'audio', maxcount: 1}, {name: 'video', maxcount: 1}]);
function getFileExtension(name){
	
}
router.post('/', fields, function(req, res, next){
	var sculpture_name = req.body.sculpture_name;

	var image = {
		file_name: req.files['image'][0].filename + getFileExtension(req.files['image'][0].originalName),
		path: req.files['image'][0].destination + req.files['image'][0].filename,
		associated_sculpture: sculpture_name,
		type: "image"
	};

	var audio = {
		file_name: req.files['audio'][0].filename + getFileExtension(req.files['audio'][0].originalName),
		path: req.files['audio'][0].destination + req.files['audio'][0].filename,
		associated_sculpture: sculpture_name,
		type: "audio"
	};

	var video = {
		file_name: req.files['video'][0].filename + getFileExtension(req.files['video'][0].originalName),
		path: req.files['video'][0].destination + req.files['video'][0].filename,
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
		} 
	});

	audio_file.save(function(err, result){
		if(err){
			console.log(err);
			res.send(err);
		} 
	});

	video_file.save(function(err, result){
		if(err){
			console.log(err);
			res.send(err);
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