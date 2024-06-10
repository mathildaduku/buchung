const express = require('express');
const hotelController = require('../controllers/hotelController');

const router = express.Router();

router
  .route('/')
  .get(hotelController.getAllHotels)
  .post(hotelController.createHotel);

router.route('/:id').get(hotelController.getHotel).patch(hotelController.updateHotel)

module.exports = router;
