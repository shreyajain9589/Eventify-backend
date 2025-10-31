import Event from '../models/EventModel.js';

export const createEvent = async (req, res) => {
    try {
        const data = req.body;
        data.available_seats = data.total_seats; // Initialize available seats
        const event = await Event.create(data);
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getEvents = async (req, res) => {
    try {
        // search & filter by location/date
        const {q, location, date} = req.query;
        const filter = {};
        if(q) filter.title = {$regex: q, $options: 'i'};
        if(location) filter.location = { $regex: location, $options: 'i' };
        if(date) {
            const day = new Date(date);
            const next = new Date(day);
            next.setDate(next.getDate() + 1);
            filter.date = { $gte: day, $lt: next };
        }
        const events = await Event.find(filter).sort({date: 1});
        res.json(events);
    } catch (err) { 
        res.status(500).json({ message: err.message });
    }
};

export const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if(!event) return res.status(404).json({message: 'Event not found'});
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};