import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";
import { AppError } from "../../errors/appError";

export const listScheduleByIdService = async (
  schedulesId: string,
  Adm: boolean
) => {
  if (!Adm) {
    throw new AppError("user is not adm!", 403);
  }
  const schedulesRepository = AppDataSource.getRepository(Schedules);

  const findSchedules = await schedulesRepository.findOneBy({
    id: schedulesId,
  });

  if (!findSchedules) {
    throw new AppError("invalid schedules id!", 404);
  }

  return findSchedules;
};
