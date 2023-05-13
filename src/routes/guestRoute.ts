import express from 'express';
import {
  getGuests,
  createGuest,
  updateGuest,
  getGuest,
  deleteGuest,
} from '../controllers/guestController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @openapi
 * '/api/guests':
 *  get:
 *    tags:
 *    - Guest
 *    summary: Get all guests
 *    description: Get all guests
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

/**
 * @openapi
 * '/api/guests':
 *  post:
 *    tags:
 *    - Guest
 *    summary: Add guest
 *    description: Add guest
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/GuestInput'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot create guest
 */

router.route('/').get(getGuests).post(protect, createGuest);

/**
 * @openapi
 * '/api/guests/{id}':
 *  get:
 *    tags:
 *    - Guest
 *    summary: Get guest by id
 *    description: Get guest by id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the guest
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Guest not found
 */

/**
 * @openapi
 * '/api/guests/{id}':
 *  put:
 *    tags:
 *    - Guest
 *    summary: Edit room
 *    description: Edit guest
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the guest
 *      required: true
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/GuestInput'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot edit guest
 */

/**
 * @openapi
 * '/api/guests/{id}':
 *  delete:
 *    tags:
 *    - Guest
 *    summary: Delete guest
 *    description: Delete guest
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the guest
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot delete guest
 */

router
  .route('/:id')
  .get(getGuest)
  .put(protect, updateGuest)
  .delete(protect, deleteGuest);

export default router;
