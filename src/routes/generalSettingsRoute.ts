import express from 'express';
import multer from 'multer';
import {
  getGeneralSettings,
  updateGeneralSettings,
} from '../controllers/generalSettingsController';
import multerStorage from '../lib/multer';

const router = express.Router();
const upload = multer({
  storage: multerStorage,
});

router
  .route('/')
  .get(getGeneralSettings)
  .put(upload.single('logo'), updateGeneralSettings);

export default router;
