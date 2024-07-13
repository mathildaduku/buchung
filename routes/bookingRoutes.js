const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    bookingController.createBooking,
  );

router.route('/:id').get(bookingController.getBooking);

module.exports = router;
