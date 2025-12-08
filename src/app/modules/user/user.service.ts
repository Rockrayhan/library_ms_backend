import { User } from "./user.model";
import { Types } from "mongoose";

export const UserService = {
  createUser: async (payload: any) => {
    return User.create(payload);
  },

  getAllUsers: async () => {
    return User.find().populate("subscription");
  },

  getSingleUser: async (id: string) => {
    if (!Types.ObjectId.isValid(id)) return null;
    return User.findById(id).populate("subscription");
  },

  updateUser: async (id: string, payload: any) => {
    if (!Types.ObjectId.isValid(id)) return null;
    return User.findByIdAndUpdate(id, payload, { new: true }).populate(
      "subscription"
    );
  },

  deleteUser: async (id: string) => {
    if (!Types.ObjectId.isValid(id)) return null;
    return User.findByIdAndDelete(id);
  },

  getMe: async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return {
      data: user,
    };
  },

  
};
