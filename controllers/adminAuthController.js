import User from '../models/UserModel.js';
import Location from '../models/LocationModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Event from "../models/EventModel.js";
import Booking from "../models/BookingModel.js";

// ------------------ LOGIN ------------------
export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.role !== "admin")
      return res.status(403).json({ message: "Forbidden: not an admin" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------- GET USER BOOKINGS ---------------- */
/* -------- GET USER BOOKINGS -------- */
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.id })
      .populate("event", "title date time location price coverImage")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// =======================
// GET ALL USERS (ADMIN ONLY)
// =======================
/* -------- GET ALL USERS -------- */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    const usersWithLastBooking = await Promise.all(
      users.map(async (u) => {
        const lastBooking = await Booking.findOne({ user: u._id })
          .sort({ createdAt: -1 })
          .select("mobile");

        return {
          ...u.toObject(),
          lastBooking: lastBooking ? lastBooking : null,
        };
      })
    );

    res.json(usersWithLastBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ------------------ VERIFY TOKEN ------------------
export const verifyAdmin = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Not an admin" });

    res.json({ ok: true });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ------------------ LOCATIONS ------------------
export const getLocations = async (req, res) => {
  const list = await Location.find().sort({ displayName: 1 });
  res.json(list);
};

export const addLocation = async (req, res) => {
  const { name, displayName } = req.body;

  const exists = await Location.findOne({ name });
  if (exists) return res.status(400).json({ message: "Location exists" });

  const loc = await Location.create({ name, displayName });
  res.json(loc);
};

export const deleteLocation = async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res.json({ message: "Location deleted" });
};
