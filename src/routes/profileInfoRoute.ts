import express from 'express';
import {
  getProfileInfo,
  updateProfileInfo,
} from '../controllers/profileInfoController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @openapi
 * '/api/profile-info':
 *  get:
 *    tags:
 *    - Profile info
 *    summary: Get all profile info
 *    description: Get all profile info
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

/**
 * @openapi
 * '/api/profile-info':
 *  put:
 *    tags:
 *    - Profile info
 *    summary: Edit profile info
 *    description: Edit profile info
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/ProfileInfo'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot edit profile info
 */

router.route('/').get(protect, getProfileInfo).put(protect, updateProfileInfo);

export default router;
