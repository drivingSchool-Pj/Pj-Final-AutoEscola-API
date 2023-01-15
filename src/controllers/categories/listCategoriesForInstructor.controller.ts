import { Request, Response } from "express";
import { listCategorieForInstructorService } from "../../services/categories/listCategorieForInstructor.service";

export const listCategorieForInstructorController = async (
    req: Request,
    res: Response
  ) => {
    const categoryId = req.params.id;
    const adm = req.userDecode.isAdm
    const userId = req.userDecode.id;
    const listedCategories = await listCategorieForInstructorService(categoryId, adm, userId);
    return res.json(listedCategories);
  };