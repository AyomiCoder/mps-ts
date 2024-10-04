// src/models/itemModel.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
}

const itemSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IItem>('Item', itemSchema);
