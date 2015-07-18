var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

/* the basic username and password will be
 * generate by a incoming root level user name
 * and password
 */
var userSchema = new mongoose.Schema({
  basic: {
    username: String,
    password: String
  },
  email: String
});

userSchema.methods.generateHash = function(password, callback) {
  bcrypt.hash(password, 8, callback)
};

userSchema.methods.compareHash = function(password, callback) {
  debugger;
  bcrypt.compare(password, this.basic.password, callback);
};

userSchema.methods.generateToken= function(secret, callback) {
  eat.encode({id: this._id}, secret, callback);
};

module.exports = mongoose.model('User', userSchema);
