import express from 'express';
import {
  getBookings,
  createBooking,
  updateBooking,
  getBooking,
  deleteBooking,
  createBookingWithGuest,
} from '../controllers/bookingController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @openapi
 * '/api/bookings':
 *  get:
 *    tags:
 *    - Booking
 *    summary: Get all bookings
 *    description: Get all bookings
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

/**
 * @openapi
 * '/api/bookings':
 *  post:
 *    tags:
 *    - Booking
 *    summary: Add booking
 *    description: Add booking
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Booking'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot create booking
 */

router.route('/').get(getBookings).post(protect, createBooking);

/**
 * @openapi
 * '/api/bookings/{id}':
 *  get:
 *    tags:
 *    - Booking
 *    summary: Get booking by id
 *    description: Get booking by id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the booking
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Room type not found
 */

/**
 * @openapi
 * '/api/bookings/{id}':
 *  put:
 *    tags:
 *    - Booking
 *    summary: Edit booking
 *    description: Edit booking
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the booking
 *      required: true
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/Booking'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot edit booking
 */

/**
 * @openapi
 * '/api/bookings/{id}':
 *  delete:
 *    tags:
 *    - Booking
 *    summary: Delete booking
 *    description: Delete booking
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the booking
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot delete booking
 */

router
  .route('/:id')
  .get(getBooking)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);
router.route('/guest').post(createBookingWithGuest);

export default router;
