var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/growlerdar", {native_parser:true});

var routes = require('./routes/index');
var locations = require('./routes/locations');
var profile = require('./routes/profile');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use('/', routes);
app.use('/locations', locations);

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
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    var msg = err.status === 404 ? 'page not found' : 'server error';
    res.status(err.status || 500).json({msg: msg});
    console.log(err);
  });
}

var port = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port: ' + port);
});
