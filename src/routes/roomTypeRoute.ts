import express from 'express';
import multer from 'multer';
import {
  getRoomTypes,
  createRoomType,
  updateRoomType,
  getRoomType,
  deleteRoomType,
} from '../controllers/roomTypeController';
import multerStorage from '../lib/multer';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer({
  storage: multerStorage,
});
const fields = [{ name: 'image', maxCount: 1 }, { name: 'images' }];

router
  .route('/')
  .get(getRoomTypes)
  .post([protect, upload.fields(fields)], createRoomType);
router
  .route('/:id')
  .get(getRoomType)
  .put([protect, upload.fields(fields)], updateRoomType)
  .delete(protect, deleteRoomType);

export default router;
