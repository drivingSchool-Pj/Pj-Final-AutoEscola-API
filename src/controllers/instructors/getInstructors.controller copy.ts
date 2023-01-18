import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { getAllInstructorsService } from "../../services/instructors/getAllInstructors.service";

export const getAllInstructorsController = async (
  request: Request,
  response: Response
) => {
  const data = await getAllInstructorsService();
  return response.status(200).json(instanceToPlain(data));
};
