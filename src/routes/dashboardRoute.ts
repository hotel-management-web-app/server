import express from 'express';
import { getDashboard } from '../controllers/dashboardController';

const router = express.Router();

/**
 * @openapi
 * '/api/dashboard':
 *  get:
 *    tags:
 *    - Dashboard
 *    summary: Get all dashboard data
 *    description: Get all dashboard data
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

router.get('/', getDashboard);

export default router;
