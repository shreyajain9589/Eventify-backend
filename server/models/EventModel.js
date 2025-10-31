import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    location: String,
    date: {type: Date, required: true},
    total_seats: {type: Number, required: true},
    available_seats: {type: Number, required: true},
    price: {type: Number, default: 0},
    img: String,
}, {timestamps: true});

const Event = mongoose.model('Event', EventSchema);
export default Event;