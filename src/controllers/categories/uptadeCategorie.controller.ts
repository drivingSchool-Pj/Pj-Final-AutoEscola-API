import { Request, Response } from "express";
import { updateCategoryService } from "../../services/categories/updateCategories.service";

export const updateCategoryController = async (req: Request, res: Response) => {
  const categoryId = req.params.id;
  const categoryData = req.body;

  const updatedCategory = updateCategoryService(categoryId, categoryData);

  return res.status(200).json(updatedCategory);
};
