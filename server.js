import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDb } from './config/db.js';
import { Server } from 'socket.io';
import http from 'http';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

// Connect to database
connectDb();

const app = express();
const server = http.createServer(app);

// ✅ Correct frontend origin (no trailing slash)
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5000";

// ✅ Middleware for CORS
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// ✅ Socket.io setup with CORS
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('disconnect', () => console.log('socket disconnected', socket.id));
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// ✅ Basic route
app.get('/', (req, res) => res.send('Event booking API'));

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
