import express from 'express';
import { getReport } from '../controllers/reportController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @openapi
 * '/api/report':
 *  post:
 *    tags:
 *    - Report
 *    summary: Get all report data
 *    description: Get all report data
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - startDate
 *              - endDate
 *            properties:
 *              startDate:
 *                type: string
 *                default: 2023-05-13T00:00:00.000Z
 *              endDate:
 *                type: string
 *                default: 2023-06-13T00:00:00.000Z
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot create room
 */

router.post('/', protect, getReport);

export default router;
