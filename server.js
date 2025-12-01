// server.js
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
import adminRoutes from './routes/adminRoutes.js';

// Connect DB
connectDb();

const app = express();
const server = http.createServer(app);

// Parse CLIENT_URL env (comma separated) and normalize
const raw = process.env.CLIENT_URL || 'http://localhost:5173';
const CLIENT_URLS = raw.split(',').map(u => u.trim()).filter(Boolean);

// Helper to check origin (allows no-origin like cURL/server-side requests)
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      // allow requests with no origin (like server-to-server / Postman)
      return callback(null, true);
    }
    if (CLIENT_URLS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} not allowed`));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Socket.io with same cors settings
const io = new Server(server, {
  cors: {
    origin: CLIENT_URLS,
    methods: ['GET', 'POST'],
    credentials: true
  },
  // optional: allow both polling + websocket transports
  transports: ['websocket', 'polling'],
});

// expose io via req.io so controllers can emit
app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('socket connected:', socket.id);
  socket.on('disconnect', () => console.log('socket disconnected:', socket.id));
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.send('Event booking API'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
