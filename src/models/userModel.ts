import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string; // Contact number for the seller
  address: string; // Optional: seller's address
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  }; // Bank details for transactions
  createdAt: Date;
}

const userSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true }, // Contact number
  address: { type: String }, // Optional address
  bankDetails: {
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    accountName: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', userSchema);
