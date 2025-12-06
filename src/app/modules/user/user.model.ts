import { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./user.interface";

export interface UserDocument extends IUser, Document {}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
  },
  { timestamps: true, versionKey: false }
);

export const User = model<UserDocument>("User", userSchema);
