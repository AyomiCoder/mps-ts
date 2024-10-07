// src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../middleware/authMiddleware';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, email, password, phone, address } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    user = new User({
      name,
      email,
      password,
      phone,
      address,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error((err as Error)?.message || 'An unknown error occurred');
    res.status(500).send('Server error');
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: 'Invalid credentials' });
      return;
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error((err as Error)?.message || 'An unknown error occurred');
    res.status(500).send('Server error');
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id; // Now this will recognize req.user
    if (!userId) {
      res.status(401).json({ msg: 'Unauthorized access, user ID is missing' });
      return; // Stop further execution
    }
    
    const user = await User.findById(userId); // Example of how you might fetch the user
    if (!user) {
      res.status(404).json({ msg: 'User not found' }); // Handle case when user is not found
      return; // Stop further execution
    }
    
    res.json(user); // Return the user data if found
  } catch (error) {
    console.error((error as Error)?.message || 'An unknown error occurred');
    res.status(500).json({ msg: 'Server error' }); // Handle server error
  }
};
