var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res){
	res.send("Hello")
});

router.post('/', function(req, res){

	console.log("post received");

	  User.findOne({
	    name: req.body.name
	  }, function(err, user) {

	    if (err) throw err;

	    if (!user) {
	      res.json({ success: false, message: 'Authentication failed. User not found.' });
	    } else if (user) {

	      // check if password matches
	      if (user.password != req.body.password) {
	        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign(user, app.get('secretvar'), {
	          expiresInMinutes: 1440 // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
      }   

    }

  });
});

module.exports = router;
