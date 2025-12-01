import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";  // <-- FIXED PATH
import "dotenv/config.js";
import { connectDb } from "../config/db.js";

const seedAdmin = async () => {
  try {
    await connectDb();

    const email = "admin@example.com";
    const password = "Admin123";

    const existing = await User.findOne({ email });

    if (existing) {
      console.log("Admin already exists:", email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name: "Admin",
      email,
      password: hashed,
      role: "admin",
    });

    console.log("Admin created successfully:");
    console.log("Email:", email);
    console.log("Password:", password);
    process.exit(0);
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
