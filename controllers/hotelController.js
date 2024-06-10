const Hotel = require('../models/hotelModel');

exports.createHotel = async (req, res) => {
  try {
    const newHotel = await Hotel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        hotel: newHotel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json({
      status: 'success',
      results: hotels.length,
      data: {
        hotels,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message,
    });
  }
};

exports.getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: {
                hotel
            }
        })
    }
    catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}


exports.updateHotel 
