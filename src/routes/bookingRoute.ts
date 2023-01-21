import express from 'express';
import {
  getBookings,
  createBooking,
  updateBooking,
  getBooking,
  deleteBooking,
  createBookingWithGuest,
} from '../controllers/bookingController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getBookings).post(protect, createBooking);
router
  .route('/:id')
  .get(getBooking)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);
router.route('/guest').post(createBookingWithGuest);

export default router;
