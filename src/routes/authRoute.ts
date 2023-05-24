import express from 'express';
import {
  loginUser,
  getMe,
  registerUser,
  logout,
} from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *    tags:
 *    - Authentication
 *    summary: Register user
 *    description: Register user
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/Register'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot register a user
 */

router.post('/register', registerUser);

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *    tags:
 *    - Authentication
 *    summary: Authenticate a user
 *    description: Authenticate a user
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot authenticate a user
 */

router.post('/login', loginUser);

/**
 * @openapi
 * '/api/auth/logout':
 *  post:
 *    tags:
 *    - Authentication
 *    summary: Logout
 *    description: Logout user
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot logout a user
 */

router.post('/logout', protect, logout);

/**
 * @openapi
 * '/api/auth/me':
 *  get:
 *    tags:
 *    - Authentication
 *    summary: Get user data
 *    description: Get user data
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

router.get('/me', protect, getMe);

export default router;
