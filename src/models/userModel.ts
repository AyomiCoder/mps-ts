import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  bankDetails?: {
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
  };
  createdAt: Date;
}

const userSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  bankDetails: {
    bankName: { type: String, required: false }, // Bank details are optional
    accountNumber: { type: String, required: false }, // Bank details are optional
    accountName: { type: String, required: false }, // Bank details are optional
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', userSchema);
