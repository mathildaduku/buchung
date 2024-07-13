const catchAsync = require('../utils/catchAsync');
const Booking = require('../models/bookingModel');

exports.createBooking = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.params.userId

  const newBooking = await Booking.create(req.body);

  res.status(201).json({
    status: 'Success',
    message: 'Booking created successfully',
    data: {
      booking: newBooking,
    },
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.userId) filter = { user: req.params.userId };

  const bookings = await Booking.find(filter);

  res.status(200).json({
    status: 'Success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      booking,
    },
  });
});
