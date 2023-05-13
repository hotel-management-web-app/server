import express from 'express';
import {
  getRooms,
  createRoom,
  updateRoom,
  getRoom,
  deleteRoom,
  updateRoomField,
} from '../controllers/roomController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @openapi
 * '/api/rooms':
 *  get:
 *    tags:
 *    - Room
 *    summary: Get all rooms
 *    description: Get all rooms
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

/**
 * @openapi
 * '/api/rooms':
 *  post:
 *    tags:
 *    - Room
 *    summary: Add room
 *    description: Add room
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Room'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot create room
 */

router.route('/').get(getRooms).post(protect, createRoom);

/**
 * @openapi
 * '/api/rooms/{id}':
 *  get:
 *    tags:
 *    - Room
 *    summary: Get room by id
 *    description: Get room by id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the room
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Room not found
 */

/**
 * @openapi
 * '/api/rooms/{id}':
 *  put:
 *    tags:
 *    - Room
 *    summary: Edit room
 *    description: Edit room
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the room
 *      required: true
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/Room'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot edit room
 */

/**
 * @openapi
 * '/api/rooms/{id}':
 *  delete:
 *    tags:
 *    - Room
 *    summary: Delete room
 *    description: Delete room
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the room
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot delete room
 */

router
  .route('/:id')
  .get(getRoom)
  .put(protect, updateRoom)
  .patch(protect, updateRoomField)
  .delete(protect, deleteRoom);

export default router;
