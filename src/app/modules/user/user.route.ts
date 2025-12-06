import express from "express";
import { UserController } from "./user.controller";

export const userRouter = express.Router();

userRouter.post("/", UserController.createUser);
userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.getSingleUser);
userRouter.patch("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);
