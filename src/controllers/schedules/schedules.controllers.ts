import { Request, Response } from "express";

import { listAllSchedulesService } from "../../services/schedules/listAllSchedules.service";
import { listScheduleByIdService } from "../../services/schedules/listScheduleById.service";
import { createSchedulesService } from "../../services/schedules/createSchedules.service";

import { IScheduleRequest } from "../../interfaces/schedules/schedules.interface";
import { IUserDecode } from "../../interfaces/user/user.interface";

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

export const createSchedulesController = async (
  req: Request,
  res: Response
) => {
  const dataBody: IScheduleRequest = req.body;

  const instructorId = dataBody.instructorsId;
  const userId = req.userDecode.id;

  const newSchedule = await createSchedulesService(
    dataBody,
    userId,
    instructorId
  );

  return res.status(201).json(newSchedule);
};
