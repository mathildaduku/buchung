const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  room_type: {
    type: String,
    required: [true, 'Please specify the room type.'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please specify the room price.'],
  },
  availability: {
    type: Boolean,
    default: true,
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },  
  bookings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
