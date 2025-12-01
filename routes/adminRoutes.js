import express from "express";
import { 
  AdminLogin, 
  getLocations, 
  addLocation, 
  deleteLocation,
  getAllUsers,
  getUserBookings
} from "../controllers/adminAuthController.js";

const router = express.Router();

// Auth
router.post("/login", AdminLogin);

// Users
router.get("/users", getAllUsers);
router.get("/users/:id/bookings", getUserBookings);   

// Locations
router.get("/locations", getLocations);
router.post("/locations", addLocation);
router.delete("/locations/:id", deleteLocation);

export default router;
