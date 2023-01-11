import { Router } from "express";
import { createUserController } from "../controllers/user/registerUser.controller";
import { softDeleteUserController } from "../controllers/user/deleteUser.controller";

const userRoutes = Router()

userRoutes.delete("/:id", softDeleteUserController)
userRoutes.post("", createUserController);

export default userRoutes