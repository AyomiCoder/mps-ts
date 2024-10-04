// src/models/requoteModel.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IRequote extends Document {
  itemId: mongoose.Types.ObjectId;
  buyerId: mongoose.Types.ObjectId;
  proposedPrice: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

const requoteSchema: Schema = new mongoose.Schema({
  itemId: { type: mongoose.Types.ObjectId, required: true, ref: 'Item' },
  buyerId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  proposedPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IRequote>('Requote', requoteSchema);
