// src/routes/authRoutes.ts

import express from 'express';
import { signup, login, getUserProfile } from '../controllers/authController';
import { validateSignup, validateLogin } from '../middleware/validateAuth';
import { protectProfile} from '../middleware/authMiddleware';

const router = express.Router();

// Signup route
router.post('/signup', validateSignup, signup);

// Login route
router.post('/login', validateLogin, login);

// Protected Profile route
router.get('/profile', protectProfile, getUserProfile);

export default router;
