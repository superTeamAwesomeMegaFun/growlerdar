var router = module.exports = exports = require('express').Router();
var Location = require(__dirname + '/../models/Location');

var handleError = function(err, res) {
  console.log(err);
  res.status(500).json({msg: 'server error'});
};

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

router.post('/locations', function(req, res) {
  var newLocation = new Location(req.body);
  newLocation.save(req.body, function(err, result) {
    if (err) return handleError(err, res);

    res.json(result);
  });
});

router.delete('/locations/:id', function(req, res) {
  Location.remove({_id: req.params.id}, function(err, result) {
    if(err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});
