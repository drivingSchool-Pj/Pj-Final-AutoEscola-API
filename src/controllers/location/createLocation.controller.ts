import { Request, Response } from "express";
import { ILocationRequest } from "../../interfaces/location/location.interface";
import { createLocationService } from "../../services/location/createLocation.service";

export const createLocationController = async (req: Request, res: Response) => {
  const locationData: ILocationRequest = req.body;
  const newUser = await createLocationService(locationData);
  return res.status(201).json(newUser);
};
