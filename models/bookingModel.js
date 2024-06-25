const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  check_in_date: {
    type: Date,
    required: [true, 'Please indicate the check in date.'],
  },
  check_out_date: {
    type: Date,
    required: [true, 'Please indicate the check out date.'],
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// when bookings are searched for, populate the user name and room type
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  }).populate({
    path: 'room',
    select: 'room_type',
  });

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
