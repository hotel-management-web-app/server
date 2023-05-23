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

/**
 * @openapi
 * '/api/auth/users':
 *  get:
 *    tags:
 *    - User
 *    summary: Get all users
 *    description: Get all users
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

router.get('/users', protect, getUsers);

/**
 * @openapi
 * '/api/auth/users/{id}':
 *  get:
 *    tags:
 *    - User
 *    summary: Get user by id
 *    description: Get user by id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the user
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Bad Request
 */

router.get('/users/:id', protect, getUser);

/**
 * @openapi
 * '/api/auth/user/{id}':
 *  put:
 *    tags:
 *    - User
 *    summary: Edit user
 *    description: Edit user
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the user
 *      required: true
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot edit user
 */

router.put('/users/:id', protect, updateUser);

/**
 * @openapi
 * '/api/auth/users/{id}':
 *  delete:
 *    tags:
 *    - User
 *    summary: Delete user
 *    description: Delete user
 *    parameters:
 *    - name: id
 *      in: path
 *      description: The id of the user
 *      required: true
 *    responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Cannot delete user
 */

router.delete('/users/:id', protect, deleteUser);

export default router;
