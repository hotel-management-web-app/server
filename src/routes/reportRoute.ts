import express from 'express';
import { getReport } from '../controllers/reportController';

const router = express.Router();

router.post('/', getReport);

export default router;
