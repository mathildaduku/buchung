const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, bookingController.getAllBookings)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    bookingController.createBooking,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    bookingController.getBooking,
  )
  .patch(
    authController.protect,
    authController.restrictTo('user'),
    bookingController.updateBooking,
  )
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    bookingController.deleteBooking,
  );

module.exports = router;
