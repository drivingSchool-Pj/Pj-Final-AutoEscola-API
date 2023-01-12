import { Request, Response } from "express";
import { listAllSchedulesService } from "../../services/schedules/listAllSchedules.service";
import { listScheduleByIdService } from "../../services/schedules/listScheduleById.service";

export const listScheduleByIdController = async (
  req: Request,
  res: Response
) => {
  const schedulesId = req.params.id;
  const Adm = req.userDecode.isAdm;
  const newSchedules = await listScheduleByIdService(schedulesId, Adm);
  return res.json(newSchedules);
};

export const listAllSchedulesController = async (
  req: Request,
  res: Response
) => {
  const newSchedules = await listAllSchedulesService();
  return res.json(newSchedules);
};
