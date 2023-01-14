import { Router } from "express";
import { deleteCategoryController } from "../controllers/categories/deleteCategorie.controller";
import { updateCategoryController } from "../controllers/categories/uptadeCategorie.controller";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureVerifyIsAdm.middleware";
import { validateSchemaMiddleware } from "../middlewares/validatedSchemas.middleware";
import { updatedCategory } from "../validations/schemas";

const categoriesRoutes = Router();

categoriesRoutes.patch(
  "instructor/:id",
  validateSchemaMiddleware(updatedCategory),
  ensureIsAdmMiddleware,
  auhValidationMiddleware,
  updateCategoryController
);

categoriesRoutes.delete(
  "/:id",
  ensureIsAdmMiddleware,
  deleteCategoryController
);
export default categoriesRoutes;
