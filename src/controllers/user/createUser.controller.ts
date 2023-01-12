import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/user/user.interface";
import { createUserService } from "../../services/user/createUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};
