import { Router } from "express";
import { softDeleteCategoryController } from "../controllers/categories/deleteCategories,controller";

const categoriesRoutes = Router()

categoriesRoutes.delete("/:id", softDeleteCategoryController);

export default categoriesRoutes