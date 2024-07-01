const mongoose = require('mongoose');

// create hotel schema

const hotelSchema = new mongoose.Schema({
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
  // country: {
  //   type: String,
  //   required: [true, 'Please specify the country where the hotel is situated.'],
  //   trim: true,
  // },
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
  // rooms: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Room',
  //   },
  // ],
  // reviews: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Review',
  //   },
  // ],
},
// ensure that virtual properties are included when the document is converted to JSON or a plain JavaScript object.
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
},);
// create a virtual rooms field on hotel schema to populate rooms property on hotels model when queried without storing long array of room ids in database
hotelSchema.virtual('rooms', {
  ref: 'Room',
  foreignField: 'hotel',
  localField: '_id',
});


// create model from schema
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
