var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res){

  var usr = new User({ 
    name: 'updadmin', 
    password: 'updadmin',
    admin: true 
  });

  usr.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});


module.exports = router;
