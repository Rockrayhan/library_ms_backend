import express from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middlewires/checkAuth";
import { UserRole } from './user.interface';
export const userRouter = express.Router();

userRouter.post("/", UserController.createUser);
userRouter.get("/", checkAuth("admin"),UserController.getAllUsers);

userRouter.get("/me", checkAuth("admin", "user"), UserController.getMe);

userRouter.get("/:id", UserController.getSingleUser);
userRouter.patch("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);
