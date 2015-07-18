var router = module.exports = exports = require('express').Router();
var Location = require(__dirname + '/../models/Location');
var handleError = require('./handle_error');
var eatauth = require(__dirname + '/../lib/eat_auth');

router.get('/locations/:id', function(req, res, next) {
  Location.findOne({_id: req.params.id}, function(err, result) {
    if (err) return handleError(err, res);

    res.json(result);
  });
});

router.get('/locations', function(req, res) {
  Location.find({}, function(err, items) {
    if (err) return handleError(err, res); 

    res.json(items);
  });
});

router.put('/locations/:id', eatauth, function(req, res) {
  var newData = req.body;
  delete newData._id;
  Location.update({_id: req.params.id}, req.body, function(err, data) {
    if (err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

router.post('/locations', eatauth, function(req, res) {
  var newLocation = new Location(req.body);

  newLocation.save(req.body, function(err, result) {
    if (err) return handleError(err, res);

    res.json(result);
  });
});

router.delete('/locations/:id', eatauth, function(req, res) {
  Location.remove({_id: req.params.id}, function(err, result) {
    if(err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});
