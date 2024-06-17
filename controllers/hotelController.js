const Hotel = require('../models/hotelModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createHotel = catchAsync( async (req, res, next) => {
    const newHotel = await Hotel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        hotel: newHotel,
      },
    });
});

exports.getAllHotels = catchAsync(async (req, res, next) => {
  
    const features = new APIFeatures(Hotel.find(), req.query)
      .filter()
      .sort()
      .selectFields()
      .paginate();
    const hotels = await features.query;

    res.status(200).json({
      status: 'success',
      results: hotels.length,
      data: {
        hotels,
      },
    });
});

exports.getHotel = catchAsync(async (req, res, next) => {
  
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return next(new AppError('No hotel found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        hotel,
      },
    });
});

exports.updateHotel = catchAsync(async (req, res, next) => {
  
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hotel) {
      return next(new AppError('No hotel found with that ID', 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        hotel,
      },
    });
});

exports.deleteHotel = catchAsync(async (req, res, next) => {
  
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    
    if (!hotel) {
      return next(new AppError('No hotel found with that ID', 404))
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
});

exports.updateHotel;
