2️⃣ Eventify Backend README
# Eventify — Backend

This is the **backend** for Eventify, an event booking web application. Built with Node.js, Express.js, and MongoDB Atlas. It handles user authentication, event management, and real-time updates.

## Features

- User registration and login with JWT authentication.
- Admin functionality to create, update, delete events.
- Real-time event updates using Socket.IO.
- Dynamic seat management for events.
- QR code generation for booking confirmation (simulated payment).

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Socket.IO
- JWT (JSON Web Tokens)
- QR Code Generation

## Installation

1. Clone the repository:

2. Navigate into the project directory:
cd Eventify-backend

3. Install dependencies:
npm install

4. Create a .env file in the root directory with the following variables:
PORT=5000
MONGO_URI=<Your MongoDB Atlas connection string>
JWT_SECRET=<Your JWT secret key>

Start the server:
npm run dev

API Endpoints

POST /api/auth/register — Register a new user.

POST /api/auth/login — User login.

GET /api/events — Get all events.

POST /api/events — Create a new event (Admin only).

PUT /api/events/:id — Update an event (Admin only).

DELETE /api/events/:id — Delete an event (Admin only).


```bash
git clone https://github.com/shreyajain9589/Eventify-backend.git