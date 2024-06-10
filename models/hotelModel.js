const mongoose = require('mongoose');

// create hotel schema

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  star_rating: {
    type: Number,
  },
  image_url: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
//   rooms: [RoomSchema],
});

// create model from schema
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
