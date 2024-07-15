import { Schema, Document } from 'mongoose';

export interface Booking extends Document {
  check_in_date: Date;
  check_out_date: Date;
  room: string;  // Room ID as a string
  createdAt: Date;
  user: string;  // User ID as a string
}

export const BookingSchema = new Schema<Booking>({
  check_in_date: {
    type: Date,
    required: [true, 'Please indicate the check-in date.'],
  },
  check_out_date: {
    type: Date,
    required: [true, 'Please indicate the check-out date.'],
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Populate the user name and room type when bookings are searched for
BookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  }).populate({
    path: 'room',
    select: 'room_type',
  });

  next();
});
