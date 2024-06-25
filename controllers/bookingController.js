const catchAsync = require('../utils/catchAsync');
const Booking = require('../models/bookingModel');

exports.createBooking = catchAsync(async (req, res, next) => {
  const newBooking = await Booking.create(req.body);

  res.status(201).json({
    status: 'Success',
    message: 'Booking created successfully',
    data: {
      booking: newBooking,
    },
  });
});

exports.getBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    status: 'Success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});
