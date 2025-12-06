import { model, Schema, Types, Document } from "mongoose";
import { ISubscription } from "./subscription.interface";

interface SubscriptionDocument extends ISubscription, Document {}

const subscriptionSchema = new Schema<SubscriptionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    planName: { type: String, required: true },
    borrowLimit: { type: Number, required: true, default: 1 },
    borrowedCount: { type: Number, required: true, default: 0 },
    expiresAt: { type: Date, required: true },
    stripeSessionId: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

export const Subscription = model<SubscriptionDocument>(
  "Subscription",
  subscriptionSchema
);
