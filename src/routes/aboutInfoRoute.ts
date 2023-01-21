import express from 'express';
import {
  getAboutInfo,
  updateAboutInfo,
} from '../controllers/aboutInfoController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getAboutInfo).put(protect, updateAboutInfo);

export default router;
