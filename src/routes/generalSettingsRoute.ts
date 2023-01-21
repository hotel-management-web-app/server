import express from 'express';
import multer from 'multer';
import {
  getGeneralSettings,
  updateGeneralSettings,
} from '../controllers/generalSettingsController';
import multerStorage from '../lib/multer';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer({
  storage: multerStorage,
});

router
  .route('/')
  .get(getGeneralSettings)
  .put([protect, upload.single('logo')], updateGeneralSettings);

export default router;
