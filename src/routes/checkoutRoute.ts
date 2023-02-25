import express from 'express';
import { checkout, createNewBooking } from '../controllers/checkoutController';

const router = express.Router();

router.post('/', checkout);
router.post('/booking', createNewBooking);

export default router;
