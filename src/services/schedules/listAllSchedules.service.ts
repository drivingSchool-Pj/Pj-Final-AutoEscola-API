import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";

export const listAllSchedulesService = async (): Promise<Schedules[]> => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);

  const allSchedules = await schedulesRepository.find();

  return allSchedules;
};
