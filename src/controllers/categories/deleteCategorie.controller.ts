import { Request, Response } from "express";
import { deleteCategoryService } from "../../services/categories/deleteCategories.service";

export const deleteCategoryController = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  await deleteCategoryService(categoryId);

  return res.status(200).json({ message: "category deleted successfully" });
};
