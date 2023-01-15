import { Request, Response } from "express";
import { listCategorieForInstructorService } from "../../services/categories/listCategorieForInstructor.service";

export const listCategorieForInstructorController = async (
  req: Request,
  res: Response
) => {
  const instructorId = req.params.id;
  const adm = req.userDecode.isAdm;
  const listedCategory = await listCategorieForInstructorService(
    instructorId,
    adm
  );
  return res.json(listedCategory);
};
