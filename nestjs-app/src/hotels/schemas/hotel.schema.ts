// src/hotels/schemas/hotel.schema.ts
import { Schema, Document } from 'mongoose';

export interface Hotel extends Document {
  name: string;
  description: string;
  address: string;
  city: string;
  starRating?: number;
  imageUrl?: string;
  createdAt: Date;
  rooms?: any[]; // Adjust this according to your Room model or remove if not used
}

export const HotelSchema = new Schema<Hotel>({
  name: {
    type: String,
    required: [true, 'Please provide a name for the hotel.'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the hotel.'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Please provide an address for the hotel.'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'Please specify the city where the hotel is located.'],
    trim: true,
  },
  starRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must be at most 5'],
  },
  imageUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

HotelSchema.virtual('rooms', {
  ref: 'Room',
  foreignField: 'hotel',
  localField: '_id',
});
