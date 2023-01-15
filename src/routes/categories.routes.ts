import { Router } from "express";
import { listCategorieForInstructorController } from "../controllers/categories/listCategoriesForInstructor.controller";
import { auhValidationMiddleware } from "../middlewares/ authValidation.middleware";

const categoriesRoutes = Router();

categoriesRoutes.get(
  "/instructors/:id",
  auhValidationMiddleware,
  listCategorieForInstructorController
);

export default categoriesRoutes;
