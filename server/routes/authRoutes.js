// authRoutes.js
import express from 'express';
import { Register, Login } from '../controllers/authController.js';
import { AdminLogin } from '../controllers/adminAuthController.js';

const router = express.Router();

router.post('/register', Register);   // all users
router.post('/login', Login);         // only users
router.post('/admin/login', AdminLogin); // only admins

export default router;
