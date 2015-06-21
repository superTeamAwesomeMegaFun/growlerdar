var express = require('express');
var router = express.Router();

var handleError = function(err, res) {
  console.log(err);
  res.status(500).json({msg: 'server error'});
};

router.get('/locations/:id', function(req, res, next) {
  var db = req.db;

  db.collection('locationlist').findById(req.params.id, function(err, result) {
    if (err) return handleError(err, res);

    res.json(result);
  });
});

router.get('/locations', function(req, res) {
  var db = req.db;

  db.collection('locationlist').find({}).toArray(function(err, items) {
    if (err) return handleError(err, res); 

    res.json(items);
  });
});

router.post('/locations', function(req, res) {
  var db = req.db;

  db.collection('locationlist').insert(req.body, function(err, result) {
    if (err) return handleError(err, res);

    res.json(result);
  });
});

router.delete('/locations/:id', function(req, res) {
  var db = req.db;
  var locationToDelete = req.params.id;

  db.collection('locationlist').removeById(locationToDelete, function(err, result) {
    if(err) return handleError(err, res);

    res.json({msg: 'success!'});
  });
});

module.exports = router;
