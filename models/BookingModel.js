import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },

    quantity: { type: Number, default: 1 },
    total_amount: Number,

    // user snapshot at booking time
    name: String,
    email: String,
    mobile: String,

    booking_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },

    qr: String,
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;
