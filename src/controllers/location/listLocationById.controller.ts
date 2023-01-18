import { Request, Response } from "express";
import { listLocationByIdService } from "../../services/location/listLocationById.service";

export const listLocationByController = async (req: Request, res: Response) => {
  const locationId = req.params.id;
  const data = await listLocationByIdService(locationId);
  return res.status(200).json(data);
};
