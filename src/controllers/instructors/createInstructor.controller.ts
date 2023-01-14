import { Request, Response } from "express";
import { createInstructorService } from "../../services/instructors/createInstructor.service";
import { IInstructorCreate } from "../../interfaces/instructors";

export const createInstructorController = async (
  request: Request,
  response: Response
) => {
  const data: IInstructorCreate = request.body;
  await createInstructorService(data);
  return response
    .status(200)
    .json({ message: "Instructor created successfully" });
};
