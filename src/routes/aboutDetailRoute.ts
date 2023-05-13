import express from 'express';
import multer from 'multer';
import {
  getAboutDetails,
  createAboutDetail,
  updateAboutDetail,
  getAboutDetail,
  deleteAboutDetail,
} from '../controllers/aboutDetailController';
import multerStorage from '../lib/multer';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer({
  storage: multerStorage,
});

/**
 * @openapi
 * '/api/about-details':
 *  get:
 *    tags:
 *    - About details
 *    summary: Get about details
 *    description: Get about details
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

/**
 * @openapi
 * '/api/about-details':
 *  post:
 *    tags:
 *    - About details
 *    summary: Add about detail
 *    description: Add about detail
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AboutDetailInput'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot create about detail
 */

router
  .route('/')
  .get(getAboutDetails)
  .post([protect, upload.single('image')], createAboutDetail);

/**
 * @openapi
 * '/api/about-details/{id}':
 *  get:
 *    tags:
 *    - About details
 *    summary: Get about detail by id
 *    description: Get about detail by id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the about detail
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Room not found
 */

/**
 * @openapi
 * '/api/about-details/{id}':
 *  put:
 *    tags:
 *    - About details
 *    summary: Edit about detail
 *    description: Edit about detail
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the about detail
 *      required: true
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/AboutDetailInput'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot edit about detail
 */

/**
 * @openapi
 * '/api/about-details/{id}':
 *  delete:
 *    tags:
 *    - About details
 *    summary: Delete about detail
 *    description: Delete about detail
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the about detail
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot delete about detail
 */

router
  .route('/:id')
  .get(getAboutDetail)
  .put([protect, upload.single('image')], updateAboutDetail)
  .delete(protect, deleteAboutDetail);

export default router;
