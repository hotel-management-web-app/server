import express from 'express';
import {
  getAboutInfo,
  updateAboutInfo,
} from '../controllers/aboutInfoController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @openapi
 * '/api/about-info':
 *  get:
 *    tags:
 *    - About info
 *    summary: Get about info
 *    description: Get about info
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

/**
 * @openapi
 * '/api/about-info':
 *  put:
 *    tags:
 *    - About info
 *    summary: Edit about info
 *    description: Edit about info
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/AboutInfo'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot edit about info
 */

router.route('/').get(getAboutInfo).put(protect, updateAboutInfo);

export default router;
