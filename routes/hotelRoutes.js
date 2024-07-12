const express = require('express');
const hotelController = require('../controllers/hotelController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Use the review router for any requests to the '/:hotelId/reviews' endpoint.
router.use('/:hotelId/reviews', reviewRouter);

router
  .route('/')
  .get(hotelController.getAllHotels)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    hotelController.createHotel,
  );

router
  .route('/:id')
  .get(hotelController.getHotel)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    hotelController.updateHotel,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    hotelController.deleteHotel,
  );

module.exports = router;
