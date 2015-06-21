var express = require('express');

var router = module.exports = exports = express.Router();

router.get('/locations', function(req, res, next) {
  res.render('locations', { title: 'Locations' });
});
