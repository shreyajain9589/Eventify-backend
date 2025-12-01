// controllers/bookingController.js
import Booking from "../models/BookingModel.js";
import Event from "../models/EventModel.js";
import generateQR from '../utils/generateQR.js';

// ------------------------------------------------------
// CREATE BOOKING
// ------------------------------------------------------
export const createBooking = async (req, res) => {
  try {
    console.log("📥 Incoming Booking Request:");
console.log("Body:", req.body);
console.log("User:", req.user);

    const userId = req.user._id; 
    const { eventId, name, email, mobile, quantity } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ message: "Name, email & mobile required" });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.available_seats < quantity) {
      return res.status(400).json({ message: "Not enough available seats" });
    }

    // update seats
    event.available_seats -= quantity;
    await event.save();

    const total_amount = event.price * quantity;

    // Create booking with user ref
    const booking = await Booking.create({
      user: userId,
      event: eventId,
      name,
      email,
      mobile,
      quantity,
      total_amount,
      status: "confirmed"
    });

    const qrData = `BookingID:${booking._id}, EventID:${eventId}, UserID:${userId}`;
    booking.qr = await generateQR(qrData);
    await booking.save();

    res.json({ success: true, booking });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------------------------------------------
// GET BOOKINGS BY EVENT (for event details)
// ------------------------------------------------------
export const getBookingsForEvent = async (req, res) => {
  try {
    const bookings = await Booking.find({ event: req.params.eventId })
      .populate("event");

    res.json({
  success: true,
  data: bookings
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------------------------------------------
// GET BOOKINGS BY USER (Admin → Users → View Bookings)
// ------------------------------------------------------
export const getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("event", "title date time location price coverImage")
      .sort({ createdAt: -1 });

    res.json({
  success: true,
  data: bookings
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
