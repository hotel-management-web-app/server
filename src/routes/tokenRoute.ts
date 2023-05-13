import express from 'express';
import { getCSRFToken, getJWT } from '../controllers/tokenController';

const router = express.Router();

/**
 * @openapi
 * '/api/jwt':
 *  get:
 *    tags:
 *    - JWT token
 *    summary: Get JWT token
 *    description: Get JWT token
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

router.get('/jwt', getJWT);
router.get('/csrf-token', getCSRFToken);

export default router;
