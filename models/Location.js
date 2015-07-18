var mongoose = require('mongoose');

var locationSchema = new mongoose.Schema({
  name: String,
  address: {
    streetAddress: String,
    city: String,
    postalCode: String,
    state: String
  },
  type: String,
  lastModified: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Location', locationSchema);
