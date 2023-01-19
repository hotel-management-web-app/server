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

const router = express.Router();
const upload = multer({
  storage: multerStorage,
});

router
  .route('/')
  .get(getAboutDetails)
  .post(upload.single('image'), createAboutDetail);
router
  .route('/:id')
  .get(getAboutDetail)
  .put(upload.single('image'), updateAboutDetail)
  .delete(deleteAboutDetail);

export default router;
