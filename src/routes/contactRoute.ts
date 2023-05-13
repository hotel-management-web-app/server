import express from 'express';
import { sendEmail } from '../controllers/contactController';

const router = express.Router();

/**
 * @openapi
 * '/api/contact':
 *  post:
 *    tags:
 *    - Contact
 *    summary: Send message to guest center service
 *    description: Send message to guest center service
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Contact'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot create room
 */

router.post('/', sendEmail);

export default router;
