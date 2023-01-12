import { Request, Response } from "express";

import { listUserService } from "../../services/user/listUser.service";

export const listUserController = async (req: Request, res: Response) => {
  const listUser = await listUserService();
  return res.status(200).json(listUser);
};
