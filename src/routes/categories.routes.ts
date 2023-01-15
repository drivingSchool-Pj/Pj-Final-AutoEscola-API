import { Router } from "express";
import { softDeleteCategoryController } from "../controllers/categories/deleteCategories,controller";
import ensureIsAdmMiddleware from "../middlewares/ensureVerifyIsAdm.middleware";

const categoriesRoutes = Router()

categoriesRoutes.delete("/:id",ensureIsAdmMiddleware, softDeleteCategoryController);

export default categoriesRoutes