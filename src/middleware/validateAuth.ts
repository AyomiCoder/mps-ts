// src/middleware/validateAuth.ts

import { check } from 'express-validator';

export const validateSignup = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('phone', 'Phone is required').not().isEmpty(),
  check('address', 'Address is required').not().isEmpty(),  // Address validation added
];

export const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];
