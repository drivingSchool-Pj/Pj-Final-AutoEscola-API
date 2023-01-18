import { Request, Response } from "express";
import { IScheduleRequest } from "../../interfaces/schedules/schedules.interface";
import { createSchedulesService } from "../../services/schedules/createSchedules.service";

export const createSchedulesController = async (
  req: Request,
  res: Response
) => {
  const dataBody: IScheduleRequest = req.body;

  const newSchedule = await createSchedulesService(dataBody);

  return res.status(201).json(newSchedule);
};
