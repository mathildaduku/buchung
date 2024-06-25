const mongoose = require('mongoose');

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// when room are searched for, populate the hotel name also
roomSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'hotel',
    select: 'name',
  });
  next();
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
