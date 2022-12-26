import express from 'express';
import {
  getBookings,
  createBooking,
  updateBooking,
  getBooking,
  deleteBooking,
  createBookingWithGuest,
} from '../controllers/bookingController';

const router = express.Router();

router.route('/').get(getBookings).post(createBooking);
router.route('/:id').get(getBooking).put(updateBooking).delete(deleteBooking);
router.route('/guest').post(createBookingWithGuest);

export default router;
