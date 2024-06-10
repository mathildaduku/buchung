const express = require('express');
const hotelController = require('../controllers/hotelController');

const router = express.Router();

router
  .route('/')
  .post(hotelController.createHotel);

module.exports = router;
