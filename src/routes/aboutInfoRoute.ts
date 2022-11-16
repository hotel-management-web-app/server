import express from 'express';
import {
  getAboutInfo,
  updateAboutInfo,
} from '../controllers/aboutInfoController';

const router = express.Router();

router.route('/').get(getAboutInfo).put(updateAboutInfo);

export default router;
