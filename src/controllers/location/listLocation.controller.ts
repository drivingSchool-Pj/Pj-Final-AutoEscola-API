import { Request, Response } from "express";
import { listLocationService } from "../../services/location/listLocation.service";

export const listLocationaController = async (req: Request, res: Response) => {
  const locations = await listLocationService();
  return res.status(200).json(locations);
};
