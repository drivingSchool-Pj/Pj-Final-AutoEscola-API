import { Router } from "express";
import { createUserController } from "../controllers/user/createUser.controller";
import { softDeleteUserController } from "../controllers/user/deleteUser.controller";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";
import {
  userRegisterValidation,
  userValidationPatch,
} from "../validations/schemas";
import updateUserController from "../controllers/user/updateUser.controller";
import { validateSchemaMiddleware } from "../middlewares/validatedSchemas.middleware";
import { listUserController } from "../controllers/user/listUser.controller";
import ensureIsAdmMiddleware from "../middlewares/ensureVerifyIsAdm.middleware";

export const userRoutes = Router();

userRoutes.delete("/:id", softDeleteUserController);

userRoutes.post(
  "",
  validateSchemaMiddleware(userRegisterValidation),
  createUserController
);

userRoutes.get(
  "",
  auhValidationMiddleware,
  ensureIsAdmMiddleware,
  listUserController
);

userRoutes.patch(
  "/:id",
  validateSchemaMiddleware(userValidationPatch),
  auhValidationMiddleware,
  updateUserController
);
