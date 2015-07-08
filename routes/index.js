'use strict';

var router = module.exports = exports = require('express').Router();
var fs = require('fs');

router.get('/', function(req, res) {
  var splash = fs.createReadStream(__dirname + '/../views/splash.html');
  splash.pipe(res);
});

router.get('/splash.css', function(req, res) {
  var splashStyle = fs.createReadStream(__dirname + '/../views/splash.css');
  splashStyle.pipe(res);
});
