import express from 'express';
import multer from 'multer';
import {
  getAboutDetails,
  createAboutDetail,
  updateAboutDetail,
  getAboutDetail,
  deleteAboutDetail,
} from '../controllers/aboutDetailController';
import multerStorage from '../lib/multer';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer({
  storage: multerStorage,
});

router
  .route('/')
  .get(getAboutDetails)
  .post([protect, upload.single('image')], createAboutDetail);
router
  .route('/:id')
  .get(getAboutDetail)
  .put([protect, upload.single('image')], updateAboutDetail)
  .delete(protect, deleteAboutDetail);

export default router;
