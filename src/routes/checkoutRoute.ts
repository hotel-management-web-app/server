import express from 'express';
import { checkout, createNewBooking } from '../controllers/checkoutController';

const router = express.Router();

/**
 * @openapi
 * '/api/checkout':
 *  post:
 *    tags:
 *    - Booking form
 *    summary: Submit booking form
 *    description: Submit booking form
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/BookingForm'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad request body
 */

/**
 * @openapi
 * '/api/checkout/booking':
 *  post:
 *    tags:
 *    - Booking form
 *    summary: Create new booking
 *    description: Create new booking
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot create new booking
 */

router.post('/', checkout);
router.post('/booking', createNewBooking);

export default router;
