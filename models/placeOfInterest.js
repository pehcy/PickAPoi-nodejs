const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeOfInterest = new Schema({
  name:{
    type: String,
    required: true
  },
  place:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('placeOfInterest', placeOfInterest);