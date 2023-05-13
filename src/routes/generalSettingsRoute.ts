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

/**
 * @openapi
 * '/api/general-settings':
 *  get:
 *    tags:
 *    - General settings
 *    summary: Get all general settings
 *    description: Get all general settings
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

/**
 * @openapi
 * '/api/general-settings':
 *  put:
 *    tags:
 *    - General settings
 *    summary: Edit general settings
 *    description: Edit general settings
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/GeneralSettingsInput'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot edit general settings
 */

router
  .route('/')
  .get(getGeneralSettings)
  .put([protect, upload.single('logo')], updateGeneralSettings);

export default router;
