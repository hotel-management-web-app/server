import express from 'express';
import multer from 'multer';
import {
  getRoomTypes,
  createRoomType,
  updateRoomType,
  getRoomType,
  deleteRoomType,
} from '../controllers/roomTypeController';
import multerStorage from '../lib/multer';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer({
  storage: multerStorage,
});
const fields = [{ name: 'image', maxCount: 1 }, { name: 'images' }];

/**
 * @openapi
 * '/api/room-types':
 *  get:
 *    tags:
 *    - Room types
 *    summary: Get all room types
 *    description: Get all room types
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

/**
 * @openapi
 * '/api/room-types':
 *  post:
 *    tags:
 *    - Room types
 *    summary: Add room type
 *    description: Add room type
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/RoomTypeInput'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot create room type
 */

router
  .route('/')
  .get(getRoomTypes)
  .post([protect, upload.fields(fields)], createRoomType);

/**
 * @openapi
 * '/api/room-types/{id}':
 *  get:
 *    tags:
 *    - Room types
 *    summary: Get room type by id
 *    description: Get room type by id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the room type
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Room type not found
 */

/**
 * @openapi
 * '/api/room-types/{id}':
 *  put:
 *    tags:
 *    - Room types
 *    summary: Edit room type
 *    description: Edit room type
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the room type
 *      required: true
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/RoomTypeInput'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot edit room type
 */

/**
 * @openapi
 * '/api/room-types/{id}':
 *  delete:
 *    tags:
 *    - Room types
 *    summary: Delete room type
 *    description: Delete room type
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the room type
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot delete room type
 */

router
  .route('/:id')
  .get(getRoomType)
  .put([protect, upload.fields(fields)], updateRoomType)
  .delete(protect, deleteRoomType);

export default router;
