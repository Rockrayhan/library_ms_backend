import { Types } from "mongoose";



export interface ISubscription {
  _id: Types.ObjectId;
  planName: "basic" | "premium";
  borrowLimit: number; 
  createdAt?: Date;
  updatedAt?: Date;
}
