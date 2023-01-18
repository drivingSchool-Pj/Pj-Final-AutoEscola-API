import { Request, Response } from "express";
import { softDeleteUserService } from "../../services/user/deleteUser.service";

export const softDeleteUserController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await softDeleteUserService(userId);

  return res.status(204).json();
};
