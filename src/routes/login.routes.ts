import { Router } from "express";
import { createLoginController } from "../controllers/login/login.controller";

const loginRoutes = Router();

loginRoutes.post("/login", createLoginController);

export default loginRoutes;