var Basic = require('passport-http').BasicStrategy;
var User = require(__dirname + '/../models/User');

module.exports = exports = function(passport) {
  passport.use('basic', new Basic({}, function(username, password, done) {
    User.findOne({'basic.username': username}, function(err, user) {
      debugger;
      if (err) return done('database error');

      if (!user) return done('no such user');

      user.compareHash(password, function(err, result) {
        debugger;
        if (err) return done('bcrypt error');
        if (result) 
          done(null, user);
        else
          done('wrong password');
      });
    });
  }));
};
