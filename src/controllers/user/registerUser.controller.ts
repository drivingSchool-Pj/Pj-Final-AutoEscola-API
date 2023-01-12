import { IUserRequest, IUserRequestAddress } from "../../interfaces/user";
import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const addressData: IUserRequestAddress = req.body.address;
  const newUser = await createUserService(userData, addressData);
  return res.status(201).json(newUser);
};
