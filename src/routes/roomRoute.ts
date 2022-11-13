import express from 'express';
import {
  getRooms,
  createRoom,
  updateRoom,
  getRoom,
  deleteRoom,
} from '../controllers/roomController';

const router = express.Router();

router.route('/').get(getRooms).post(createRoom);
router.route('/:id').get(getRoom).put(updateRoom).delete(deleteRoom);

export default router;
