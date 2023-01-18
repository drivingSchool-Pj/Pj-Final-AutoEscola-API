import { listAllSchedulesService } from "../../services/schedules/listAllSchedules.service";
import { Request, Response } from "express";
export const listAllSchedulesController = async (
  req: Request,
  res: Response
) => {
  const newSchedules = await listAllSchedulesService();
  return res.json(newSchedules);
};
