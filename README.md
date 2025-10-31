# Eventify – Event Management Web App

Eventify is a **full-stack event management application** built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It allows users to browse events, book tickets, and for admins to create, update, and delete events.

---

## Table of Contents
1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Installation & Setup](#installation--setup)  
4. [Seed Admin Account](#seed-admin-account)  
5. [Usage](#usage)  
   - [User](#user)  
   - [Admin](#admin)  
6. [API Endpoints](#api-endpoints)  
7. [Folder Structure](#folder-structure)  
8. [Screenshots](#screenshots)  
9. [License](#license)  

---

## Features

**For Users:**
- Browse all events.
- Search events by title or location.
- Filter events by date.
- View event details.
- Book tickets for available seats.

**For Admins:**
- Create new events.
- Update existing events (including total seats, price, description, image, date, location).
- Delete events.
- Admin login system to secure management features.

---

## Technologies Used

- **Frontend:** React, React Router DOM, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Real-time:** Socket.IO (for seat availability updates)  
- **Authentication:** JWT (Admin)  

---

## Installation & Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd eventify


2. Install dependencies for both frontend and backend:

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3. Create a .env file in the backend folder with:

PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>

4. Start the backend server:

cd backend
npm run dev

5. Start the frontend server:

cd frontend
npm start

6. Open your browser at http://localhost:5173 (or your configured frontend port).

Seed Admin Account

Before using admin features, you need an admin account. You can seed a default admin manually in your MongoDB or use a registration script.

Default Admin Example:

{
  "username": "admin",
  "password": "admin123"
}

Use this login at /admin/login to access the dashboard.
Admin token is stored in localStorage after login for authenticated requests.

USAGE:
User
1. Navigate to the landing page (/).
2. Browse events using search or filter by location/date.
3. Click View on any event to see details.
4. Select quantity and click Proceed to checkout.

Admin
1. Go to /admin/login.
2. Login with seeded credentials.
3. Admin Dashboard shows all events:
    Update: Edit title, description, price, seats, date, location, and image.
    Delete: Remove unwanted events.
4.Create a new event using the form (title, date, location, total seats, price, image URL, description).

Note: Only logged-in admins can perform create, update, or delete actions.

API Endpoints
| Method | Endpoint          | Description            |
| ------ | ----------------- | ---------------------- |
| GET    | `/api/events`     | Get all events         |
| GET    | `/api/events/:id` | Get single event by ID |
| POST   | `/api/events`     | Create event (Admin)   |
| PUT    | `/api/events/:id` | Update event (Admin)   |
| DELETE | `/api/events/:id` | Delete event (Admin)   |

Search & Filter Params:
q → event title (partial match)
location → filter by location
date → filter by date (YYYY-MM-DD)

Folder Structure
frontend/
  ├─ src/
  │   ├─ components/   # Navbar, Footer, EventCard
  │   ├─ pages/        # Landing, Events, EventDetails, Checkout, AdminDashboard, AdminLogin, UserAuth
  │   └─ services/     # API setup
backend/
  ├─ models/           # Mongoose schemas
  ├─ controllers/      # Event CRUD logic
  ├─ routes/           # Express routes
  └─ index.js          # Server entry point
