// routes/bookingRoutes.js
import express from "express";
import { 
  createBooking, 
  getBookingsForEvent, 
  getBookingsByUser 
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// User creates booking
router.post("/", protect, createBooking);

// Get bookings for event
router.get("/event/:eventId", getBookingsForEvent);

// Admin → View bookings of a user
router.get("/user/:userId", protect, getBookingsByUser);

export default router;
