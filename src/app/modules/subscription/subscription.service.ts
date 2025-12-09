import { ISubscription } from "./subscription.interface";
import { Subscription } from "./subscription.model";

export const SubscriptionService = {
  createSubscription: async (payload: ISubscription) => {
    return Subscription.create(payload);
  },

  getAllSubscriptions: async () => {
    return Subscription.find();
  },

  getSingleSubscription: async (id: string) => {
    return Subscription.findById(id);
  },

  updateSubscription: async (id: string, payload: Partial<ISubscription>) => {
    return Subscription.findByIdAndUpdate(id, payload, { new: true });
  },

  deleteSubscription: async (id: string) => {
    return Subscription.findByIdAndDelete(id);
  },
};
