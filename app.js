var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/growlerdar", {native_parser:true});

var routes = require('./routes/index');
var locations = require('./routes/locations');
var profile = require('./routes/profile');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());

//allow CORS requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes);
app.use('/api', locations);

// catch 404 and forward to error handler
// TODO (TYLER): I might get rid of this and simplify not sure yet
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  var msg = err.status === 404 ? 'page not found' : 'server error';
  res.status(err.status || 500).json({msg: msg});
  console.log(err);
});

var port = process.env.PORT || 4000;
app.listen(port, function() {
  console.log('server running on port: ' + port);
});
