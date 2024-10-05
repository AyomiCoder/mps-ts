// src/routes/authRoutes.ts

import express from 'express';
import { signup, login } from '../controllers/authController';
import { validateSignup, validateLogin } from '../middleware/validateAuth';

const router = express.Router();

// Signup route
router.post('/signup', validateSignup, signup);

// Login route
router.post('/login', validateLogin, login);

export default router;
