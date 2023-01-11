import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/login";
import { createLoginService } from "../../services/login/login.service";

export const createLoginController = async (
  request: Request,
  response: Response
) => {
  const data: IUserLogin = request.body;
  const token = await createLoginService(data);
  return response.status(200).json({ token });
};
