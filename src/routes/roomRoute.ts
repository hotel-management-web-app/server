import express from 'express';
import {
  getRooms,
  createRoom,
  updateRoom,
  getRoom,
  deleteRoom,
  updateRoomField,
} from '../controllers/roomController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getRooms).post(protect, createRoom);
router
  .route('/:id')
  .get(getRoom)
  .put(protect, updateRoom)
  .patch(protect, updateRoomField)
  .delete(protect, deleteRoom);

export default router;
