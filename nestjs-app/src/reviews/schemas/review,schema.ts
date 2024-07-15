import { Schema, Document } from 'mongoose';

export interface Review extends Document {
  user: string;  // User ID as a string
  hotel: string;  // Hotel ID as a string
  rating: number;
  review: string;
  createdAt: Date;
}

export const ReviewSchema = new Schema<Review>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5'],
    required: [true, 'Please provide a rating.'],
  },
  review: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Populate the user name and hotel name when reviews are searched for
ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  }).populate({
    path: 'hotel',
    select: 'name',
  });
  next();
});
