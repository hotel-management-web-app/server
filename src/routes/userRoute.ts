import express from 'express';
import {
  loginUser,
  getMe,
  registerUser,
  logout,
  getJWT,
} from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.get('/jwt', protect, getJWT);

export default router;
