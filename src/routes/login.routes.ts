import { Router } from "express";
import { createLoginController } from "../controllers/login/login.controller";
import { validateSchemaMiddleware } from "../middlewares/validatedSchemas.middleware";
import { loginValidation } from "../validations/schemas";

const loginRoutes = Router();

loginRoutes.post(
  "",
  validateSchemaMiddleware(loginValidation),
  createLoginController
);

export default loginRoutes;
