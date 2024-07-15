import { Schema, Document } from 'mongoose';

export interface Room extends Document {
  room_type: string;
  price: number;
  availability: boolean;
  hotel: string;  // Use the Hotel ID as a string
  createdAt: Date;
}

export const RoomSchema = new Schema<Room>({
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
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// When rooms are searched for, populate the hotel name also
RoomSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'hotel',
    select: 'name',
  });
  next();
});
