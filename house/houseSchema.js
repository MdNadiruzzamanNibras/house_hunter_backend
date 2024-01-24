const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  roomSize: {
    type: String, 
    required: true
  },
  image: {
    type: String, 
    required: true
  },
  availabilityDate: {
    type: Date,
    required: true
  },
  rentPerMonth: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String, 
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
