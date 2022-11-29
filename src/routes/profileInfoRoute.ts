import express from 'express';
import {
  getProfileInfo,
  updateProfileInfo,
} from '../controllers/profileInfoController';

const router = express.Router();

router.route('/').get(getProfileInfo).put(updateProfileInfo);

export default router;
