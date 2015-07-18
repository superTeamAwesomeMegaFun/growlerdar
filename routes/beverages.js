var router = module.exports = exports = require('express').Router();
var Beverage = require(__dirname + '/../models/Beverage');
var handleError = require('./handle_error');
var eatauth = require(__dirname + '/../lib/eat_auth');

router.get('/beverages', function(req, res) {
  Beverage.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

router.post('/beverages', eatauth, function(req, res) {
  var beverage = new Beverage(req.body);
  beverage.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});


