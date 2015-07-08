var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  var db = req.db;

  db.collection('locationlist').findById(req.params.id, function(err, result) {
    if (err) return next(err)
    //res.render('profile', { title: 'Profile for ' + result.locationname, result: result });
  });
});

router.get('/locationlist', function(req, res) {
  var db = req.db;

  console.log("shoop");

  db.collection('locationlist').find().toArray(function (err, items) {
    console.log("whoop");
    console.log(items);
    res.json(items);
  });
});

router.post('/addlocation', function(req, res) {
  var db = req.db;

  db.collection('locationlist').insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

router.delete('/deletelocation/:id', function(req, res) {
  var db = req.db;
  var locationToDelete = req.params.id;

  db.collection('locationlist').removeById(locationToDelete, function(err, result) {
    res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;
