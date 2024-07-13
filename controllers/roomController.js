const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Room = require('../models/roomModel');

exports.getAllRooms = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.hotelId) filter = { hotel: req.params.hotelId };

  const rooms = await Room.find(filter);

  res.status(200).json({
    status: 'Success',
    results: rooms.length,
    data: {
      rooms,
    },
  });
});

exports.createRoom = catchAsync(async (req, res, next) => {
  // If the hotel ID is not present in the request body, set it to the hotel ID from the route parameters.
  if (!req.body.hotel) req.body.hotel = req.params.hotelId;

  // If the user ID is not present in the request body, set it to the ID of the currently authenticated user.
  if (!req.body.user) req.body.user = req.user.id;

  const newRoom = await Room.create(req.body);

  res.status(201).json({
    status: 'Success',
    message: 'Room created successfully',
    data: {
      room: newRoom,
    },
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new AppError('No room found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      room,
    },
  });
});

exports.updateRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!room) {
    return next(new AppError('No room found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      room,
    },
  });
});

exports.deleteRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findByIdAndDelete(req.params.id);

  if (!room) {
    return next(new AppError('No room found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
