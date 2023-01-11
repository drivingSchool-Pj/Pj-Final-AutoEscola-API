import { Router } from "express";
import { softDeleteUserController } from "../controllers/user/deleteUser.controller";

const userRoutes = Router()

userRoutes.delete("/:id", softDeleteUserController)

export default userRoutes