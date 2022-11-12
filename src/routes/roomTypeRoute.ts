import express from 'express';
import {
  getRoomTypes,
  createRoomType,
  updateRoomType,
  getRoomType,
  deleteRoomType,
} from '../controllers/roomTypeController';

const router = express.Router();

router.route('/').get(getRoomTypes).post(createRoomType);
router
  .route('/:id')
  .get(getRoomType)
  .put(updateRoomType)
  .delete(deleteRoomType);

export default router;
