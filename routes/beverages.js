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

router.get('/beverages/:id', function(req, res) {
  Beverage.findOne({_id: req.params.id}, function(err, data) {
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

router.put('/beverages/:id', eatauth, function(req, res) {
  var bevData = req.body;
  delete bevData._id;
  Beverage.update({_id: req.params.id}, bevData, function(err, data) {
    if (err) return res.status(500).json({msg: 'server error'});

    res.json({msg: 'success!'});
  });
});

router.delete('/beverages/:id', eatauth, function(req, res) {
  Beverage.remove({_id: req.params.id}, function(err, data) {
    if (err) return res.status(500).json({msg: 'server error'});

    res.json({msg: 'success!'});
  });
});
