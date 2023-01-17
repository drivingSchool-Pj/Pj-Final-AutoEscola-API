import { Request, Response } from "express";
import { deleteInstructorService } from "../../services/instructors/deleteInstructor.service";

export const deleteInstructorController = async (
    request: Request,
    response: Response
  ) => {
    await deleteInstructorService(request.params.id);
    return response.status(209).json({message: "sucefully deleted"});
  };