import { Request, Response } from "express"
import { softDeleteCategoryService } from "../../services/categories/deleteCategories.service"


export const softDeleteCategoryController = async (req: Request, res:Response) => {
  
  const categoryId = req.params.id
  await softDeleteCategoryService(categoryId)

  return res.status(200).json({message: "Category successfully deleted !"})

}
