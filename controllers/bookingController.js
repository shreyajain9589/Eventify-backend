import Booking from "../models/BookingModel.js";
import Event from "../models/EventModel.js";
import generateQR from '../utils/generateQR.js'; // make sure the path is correct

export const createBooking = async (req, res) => {
  try {
    const { eventId, name, email, mobile, quantity } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({ message: 'Name, email, and mobile are required' });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.available_seats < quantity) {
      return res.status(400).json({ message: 'Not enough available seats' });
    }

    event.available_seats -= quantity;
    await event.save();

    const total_amount = event.price * quantity;

    const booking = await Booking.create({
      event: eventId,
      name,
      email,
      mobile,
      quantity,
      total_amount,
      status: 'confirmed'
    });

    const qrData = `BookingID: ${booking._id}, EventID: ${eventId}`;
    booking.qr = await generateQR(qrData);
    await booking.save();

    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getBookingsForEvent = async (req, res) => {
    try {
        const bookings = await Booking.find({event: req.params.eventId}).populate('event');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};