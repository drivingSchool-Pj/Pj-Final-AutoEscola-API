import { Request, Response } from "express";
import {
  getAllInstructorsService,
  getOneInstructorService,
} from "../../services/instructors/getInstructor.service";

export const getAllInstructorsController = async (
  request: Request,
  response: Response
) => {
  const data = await getAllInstructorsService();
  return response.status(200).json(data);
};

export const getOneInstructorController = async (
  request: Request,
  response: Response
) => {
  const data = await getOneInstructorService(request.params.id);
  return response.status(200).json(data);
};
