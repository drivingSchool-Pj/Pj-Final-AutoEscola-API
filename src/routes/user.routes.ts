import { Router } from "express";
import { createUserController } from "../controllers/user/registerUser.controller";
import { softDeleteUserController } from "../controllers/user/deleteUser.controller";
import { updateUser, userRegisterValidation } from "../validations/schemas";
import { validateSchemaMiddleware } from "../middlewares/validatedSchemas.middleware";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";
import updateUserController from "../controllers/user/updateUser.controller";

export const userRoutes = Router();

userRoutes.delete("/:id", softDeleteUserController);

userRoutes.post(
  "",
  validateSchemaMiddleware(userRegisterValidation),
  createUserController
);

userRoutes.patch(
  "/:id",
  validateSchemaMiddleware(updateUser),
  auhValidationMiddleware,
  updateUserController
);
