import { Request, Response } from "express";
import { listLocationDataService } from "../../services/location/listLocationById.service";

export const listLocationByIdDataController = async (req: Request,res: Response) => {
  const locationId = req.params.id;
  const data = await listLocationDataService(locationId);
  return res.status(200).json(data);
};
