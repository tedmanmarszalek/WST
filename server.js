var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var port = process.env.PORT || 8080;
var ip = process.env.IP || '10.128.18.238';


/* Place Models Here */
require('./models/Sculptures.js');
require('./models/Files.js');
require('./models/Users.js');

/* Database Connection */
//To login to mlab.com to see the data in the database:
//Username: urbanaparks
//Password: UPD123

//var mongodbURI = "mongodb://localhost:27017"
var mongodbURI = "mongodb://admin:asdf@ds019698.mlab.com:19698/urbanaparkstest"
mongoose.connect(mongodbURI);
console.log("Database Connected");

/* Server Config */
var app = express();

// uncomment for splitting into backend and frontend folder
// app.use('/', express.static('../frontend'))
// app.use(favicon(path.join('../frontend', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/* Place Routes Here */
var sculpture_router = require('./routes/Sculptures.js');
var upload_router = require('./routes/Uploads.js');
var auth_router = require('./routes/Auth.js');
var setup_router = require('./routes/Setup.js');

app.use('/auth', auth_router)
app.use('/sculpture', sculpture_router)
app.use('/upload', upload_router);

app.use('/setup', setup_router);

// uncomment for local testing
app.listen(port);

// uncomment for live
// app.listen(port, ip); 
console.log("app started on " + port);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send("err");
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("err");
});


module.exports = app;