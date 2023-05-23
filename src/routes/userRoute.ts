import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import { authorizeSuperAdmin } from '../middleware/authorizationMiddleware';

const router = express.Router();

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

router.get('/', [protect, authorizeSuperAdmin], getUsers);

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

router.get('/:id', [protect, authorizeSuperAdmin], getUser);

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

router.put('/:id', [protect, authorizeSuperAdmin], updateUser);

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

router.delete('/:id', [protect, authorizeSuperAdmin], deleteUser);

export default router;
