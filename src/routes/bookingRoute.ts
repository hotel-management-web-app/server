import express from 'express';
import {
  getBookings,
  createBooking,
  updateBooking,
  getBooking,
  deleteBooking,
} from '../controllers/bookingController';

const router = express.Router();

router.route('/').get(getBookings).post(createBooking);
router.route('/:id').get(getBooking).put(updateBooking).delete(deleteBooking);

export default router;
