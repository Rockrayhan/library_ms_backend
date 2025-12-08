import { Types } from "mongoose";

export type UserRole = "admin" | "user";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  subscription?: Types.ObjectId; // reference to subscription
  createdAt?: Date;
  updatedAt?: Date;
}





