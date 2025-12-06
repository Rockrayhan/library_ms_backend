import { Types } from "mongoose";




export interface ISubscription {
  userId: Types.ObjectId;       // reference to User
  planName: "basic" | "premium"; 
  borrowLimit: number;          // how many books user can borrow
  borrowedCount: number;        // currently borrowed books
  expiresAt: Date;              // subscription expiry
  stripeSessionId?: string;     // Stripe payment session
  active: boolean;              // active or not
  createdAt?: Date;
  updatedAt?: Date;
}
