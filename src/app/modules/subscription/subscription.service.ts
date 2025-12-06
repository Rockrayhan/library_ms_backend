import { Subscription } from "./subscription.model";
import { ISubscription } from "./subscription.interface";
import { Types } from "mongoose";

export const SubscriptionService = {
  createSubscription: async (payload: ISubscription) => {
    return Subscription.create(payload);
  },

  getAllSubscriptions: async () => {
    return Subscription.find().populate("userId", "name email");
  },

  getSingleSubscription: async (id: string) => {
    return Subscription.findById(id).populate("userId", "name email");
  },

  updateSubscription: async (id: string, payload: Partial<ISubscription>) => {
    return Subscription.findByIdAndUpdate(id, payload, { new: true });
  },

  deleteSubscription: async (id: string) => {
    return Subscription.findByIdAndDelete(id);
  },

  incrementBorrowedCount: async (userId: Types.ObjectId, quantity = 1) => {
    return Subscription.findOneAndUpdate(
      { userId, active: true },
      { $inc: { borrowedCount: quantity } },
      { new: true }
    );
  },

  decrementBorrowedCount: async (userId: Types.ObjectId, quantity = 1) => {
    return Subscription.findOneAndUpdate(
      { userId, active: true },
      { $inc: { borrowedCount: -quantity } },
      { new: true }
    );
  },
};
