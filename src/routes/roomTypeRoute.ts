import express from 'express';
import {
  getRoomTypes,
  createRoomType,
  updateRoomType,
  getRoomType,
  deleteRoomType,
} from '../controllers/roomTypeController';

const router = express.Router();

router.get('/', getRoomTypes);
router.get('/:id', getRoomType)
router.post('/', createRoomType);
router.put('/:id', updateRoomType)
router.delete('/:id', deleteRoomType)

export default router;
