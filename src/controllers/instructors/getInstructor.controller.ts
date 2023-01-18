import { Request, Response } from "express";
import { getOneInstructorService } from "../../services/instructors/getInstructor.service";
import { instanceToPlain } from "class-transformer";

export const getOneInstructorController = async (
  request: Request,
  response: Response
) => {
  const data = await getOneInstructorService(request.params.id);
  return response.status(200).json(instanceToPlain(data));
};
