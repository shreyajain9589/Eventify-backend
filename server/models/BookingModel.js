import mongoose from 'mongoose';    

const BookingSchema = new mongoose.Schema({
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
    name: String,
    email: String,
    mobile: String,
    quantity: {type: Number, default: 1},
    total_amount: Number,
    booking_date: {type: Date, default: Date.now},
    status: {type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed'},
    qr: String,
}, {timestamps: true});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;