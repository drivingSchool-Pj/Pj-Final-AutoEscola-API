import { Router } from "express";
import { createUserController } from "../controllers/user/registerUser.controller";
import { softDeleteUserController } from "../controllers/user/deleteUser.controller";

export const userRoutes = Router()

userRoutes.delete("/:id", softDeleteUserController)
userRoutes.post("", createUserController);

