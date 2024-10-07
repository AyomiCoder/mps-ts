// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const protectProfile = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer token

  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' }); // Send response
    return; // Ensure no further execution
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { user: { id: string } };
    req.user = decoded.user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' }); // Send response on error
    return; // Ensure no further execution
  }
};
