import express from 'express';
import {
  getGeneralSettings,
  updateGeneralSettings,
} from '../controllers/generalSettingsController';

const router = express.Router();

router.route('/').get(getGeneralSettings).put(updateGeneralSettings);

export default router;
