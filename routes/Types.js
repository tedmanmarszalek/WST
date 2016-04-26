var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');
var Types = mongoose.model('Type');

router.get('/', function(req, res){

  Types.find(function(err, types){
    if(err){ return next(err); }
    res.json(types);
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
			  var type = new Types({name: req.body.type});
			  type.save(function(err){
			  	  if (err) {
					return err;
			  }
				  else {
				  	console.log("type saved");
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

router.post('/delete', function(req, res, next){
	var token = req.body.token;

	if(token) {
	    // verifies secret and checks exp
	    jwt.verify(token, 'UPDSECRET', function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	      		console.log('authenticated');
				Types.remove({ _id: req.body.id }, function(err) {
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

module.exports = router;
