const catchAsync = require('../utils/catchAsync');
const Room = require('../models/roomModel');

exports.getAllRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find();

  res.status(200).json({
    status: 'Success',
    results: rooms.length,
    data: {
      rooms,
    },
  });
});

exports.createRoom = catchAsync(async (req, res, next) => {
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
