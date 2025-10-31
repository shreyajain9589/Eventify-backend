import express from 'express';
import { createBooking, getBookingsForEvent } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/event/:eventId', getBookingsForEvent);

export default router;