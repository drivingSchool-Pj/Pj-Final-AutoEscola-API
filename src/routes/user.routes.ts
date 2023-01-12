import { Router } from "express";
import { createUserController } from "../controllers/user/createUser.controller";
import { softDeleteUserController } from "../controllers/user/deleteUser.controller";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";
import { updateUser, userRegisterValidation } from "../validations/schemas";
import updateUserController from "../controllers/user/updateUser.controller";
import { validateSchemaMiddleware } from "../middlewares/validatedSchemas.middleware";
import { listUserController } from "../controllers/user/listUser.controller";

export const userRoutes = Router();

userRoutes.delete("/:id", softDeleteUserController);

userRoutes.post(
  "",
  validateSchemaMiddleware(userRegisterValidation),
  createUserController
);

userRoutes.get("", listUserController);

userRoutes.patch(
  "/:id",
  validateSchemaMiddleware(updateUser),
  auhValidationMiddleware,
  updateUserController
);
