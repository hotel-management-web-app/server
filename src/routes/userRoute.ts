import express from 'express';
import {
  loginUser,
  getMe,
  registerUser,
  logout,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *    tags:
 *    - User
 *    summary: Register user
 *    description: Register user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 default: Admin
 *               email:
 *                 type: string
 *                 default: admin@example.com
 *               password:
 *                 type: string
 *                 default: password
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
 *    - User
 *    summary: Authenticate a user
 *    description: Authenticate a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: admin@example.com
 *               password:
 *                 type: string
 *                 default: password
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
 *    - User
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
 *    - User
 *    summary: Get user data
 *    description: Get user data
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

router.get('/me', protect, getMe);
router.get('/users', protect, getUsers);
router.get('/users/:id', protect, getUser);
router.put('/users/:id', protect, updateUser);
router.delete('/users/:id', protect, deleteUser);

export default router;
