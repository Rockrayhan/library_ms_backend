import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./user.interface";
import bcryptjs from 'bcryptjs';


const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
  },
  { timestamps: true, versionKey: false }
);


// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashed = await bcryptjs.hash(this.password, 10);
    this.password = hashed;
  }
  next();
});


export const User = model<IUser>("User", userSchema);
