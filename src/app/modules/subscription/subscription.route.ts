import express from "express";
import { SubscriptionController } from "./subscription.controller";

export const subscriptionRouter = express.Router();

subscriptionRouter.post("/", SubscriptionController.createSubscription);
subscriptionRouter.get("/", SubscriptionController.getAllSubscriptions);
subscriptionRouter.get("/:id", SubscriptionController.getSingleSubscription);
subscriptionRouter.patch("/:id", SubscriptionController.updateSubscription);
subscriptionRouter.delete("/:id", SubscriptionController.deleteSubscription);
