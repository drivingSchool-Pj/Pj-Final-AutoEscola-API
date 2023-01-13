import { Request, Response } from "express";
import { getAllInstructorsService } from "../../services/instructors/getInstructor.service";
import { instanceToPlain } from "class-transformer";

export const getAllInstructorsController = async (
  request: Request,
  response: Response
) => {
  const data = await getAllInstructorsService();
  return response.status(200).json(instanceToPlain(data));
};
