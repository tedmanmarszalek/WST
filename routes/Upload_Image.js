var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer')
var upload = multer({ dest: "./sculpture_images/" })

var mongoose = require('mongoose');
var Sculpture = mongoose.model('Sculpture');

router.get('/', function(req, res){
	res.send("Hello")
});


router.param('sculpture', function(req, res, next, id) {
  var query = Sculpture.findById(id);

  query.exec(function (err, sculpture){
    if (err) { return next(err); }
    if (!sculpture) { return next(new Error('no sculpture found')); }

    req.sculpture = sculpture;
    return next();
  });
});

router.post('/:sculpture', upload.single('file'), function(req, res, next){
	var file_id = req.sculpture;

	var file_obj = {
		file_id: file_id,
		path: req.file.destination+req.file.filename,
		original_name: req.file.originalname
		//uploaded_on: Date.now()
	}
	
	var group_name = req.body.group_name || "Default"

	file_obj = new file(file_obj)

	file_obj.save(function(err, result){
		if(!err){
			if(req.body.email){
				user.update({email: req.body.email, "groups.group_name": group_name}, {$push: {"groups.$.files": file_id}}, function(err, result){
					if(!err){
						res.json({
							success: true,
							file_id: file_id
						})
					} else {
						console.log(err)
					}
				})
			} else {
				//Not logged in
				console.log("Hello2")
				res.json({
					success: true,
					msg: "",
					file_id: file_id
				})
			}
		}
	})
});

module.exports = router;