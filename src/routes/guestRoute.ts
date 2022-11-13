import express from 'express';
import {
  getGuests,
  createGuest,
  updateGuest,
  getGuest,
  deleteGuest,
} from '../controllers/guestController';

const router = express.Router();

router.route('/').get(getGuests).post(createGuest);
router.route('/:id').get(getGuest).put(updateGuest).delete(deleteGuest);

export default router;