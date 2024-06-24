const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
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
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Review = mongoose.model('Review', reviewSchema);
  
  module.exports = Review;
  