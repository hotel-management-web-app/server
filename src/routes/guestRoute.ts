import express from 'express';
import {
  getGuests,
  createGuest,
  updateGuest,
  getGuest,
  deleteGuest,
} from '../controllers/guestController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getGuests).post(protect, createGuest);
router
  .route('/:id')
  .get(getGuest)
  .put(protect, updateGuest)
  .delete(protect, deleteGuest);

export default router;
