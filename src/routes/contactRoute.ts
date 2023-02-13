import express from 'express';
import { sendEmail } from '../controllers/contactController';

const router = express.Router();

router.post('/', sendEmail);

export default router;
