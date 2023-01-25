import express from 'express';
import {
  getProfileInfo,
  updateProfileInfo,
} from '../controllers/profileInfoController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getProfileInfo).put(protect, updateProfileInfo);

export default router;
