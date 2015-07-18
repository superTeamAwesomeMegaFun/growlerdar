var mongoose = require('mongoose');

var bevSchema = new mongoose.Schema({
  brewery: String,
  name: String,
  description: String,
  type: String,
  flavorTags: String 
});

module.exports = mongoose.model('Beverage', bevSchema);
