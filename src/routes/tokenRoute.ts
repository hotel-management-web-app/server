import express from 'express';
import { getCSRFToken, getJWT } from '../controllers/tokenController';

const router = express.Router();

router.get('/jwt', getJWT);
router.get('/csrf-token', getCSRFToken);

export default router;
