var User = require(__dirname + '/../models/User');
var router = require('express').Router();

module.exports = exports = function(passport) {
  router.get('/sign_in', passport.authenticate('basic', {session: false}), function(req,res) {
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if (err) return res.status(401).json({msg: 'could not authenticate'});
      res.json({token: token});
    });
  });

  router.post('/users', function(req, res) {
    var user = new User(req.body);
    user.generateHash(req.body.password || req.body.basic.password, function(err, hash) {
      if (err) return res.status(500).json({msg: 'server error'});
      user.basic.username = req.body.username || req.body.basic.username;
      user.basic.password = hash;
      user.save(function(err, data) {
        data.generateToken(process.env.APP_SECRET, function(err, token) {
          res.json({token: token});
        })
      });
    });
  });
  return router;
};
