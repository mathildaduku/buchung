const express = require('express');
const roomController = require('../controllers/roomController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(roomController.getAllRooms)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    roomController.createRoom,
  );

router.route('/:id').get(roomController.getRoom).patch(
  authController.protect,
  authController.restrictTo('admin'),
  roomController.updateRoom,
)
.delete(
  authController.protect,
  authController.restrictTo('admin'),
  roomController.deleteRoom,
);
module.exports = router;
