const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// Create a new Express router instance, ensuring that route parameters from parent routers are merged into this router.
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protect, authController.restrictTo('user'),reviewController.createReview);

router.route('/:id').get(reviewController.getReview);

module.exports = router;
