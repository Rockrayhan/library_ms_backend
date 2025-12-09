import { Schema, model } from "mongoose";
import { ISubscription } from "./subscription.interface";

const subscriptionPlanSchema = new Schema<ISubscription>(
  {
    planName: { type: String, required: true, enum: ["basic", "premium"] },
    borrowLimit: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Subscription = model<ISubscription>(
  "Subscription",
  subscriptionPlanSchema
);
