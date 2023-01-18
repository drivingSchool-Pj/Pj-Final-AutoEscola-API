import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";
import { Location } from "../../entities/location.entity";
import { Instructors } from "../../entities/instructors.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules/schedules.interface";

export const createSchedulesService = async (
  data: any,
  userId: string,
  instructorId: string
) => {
  const scheduleRepository = AppDataSource.getRepository(Schedules);

  const locationRespository = AppDataSource.getRepository(Location);

  const instructorRespository = AppDataSource.getRepository(Instructors);

  const instructor = await instructorRespository.findOneBy({
    id: data.instructorsId,
  });

  if (!instructor) {
    throw new AppError("Instructor not found", 400);
  }

  const location = await locationRespository.findOneBy({
    id: data.locationId,
  });

  if (!location) {
    throw new AppError("LocationId invalid", 400);
  }

  const scheduleVerifyHourAndDate = await AppDataSource.createQueryBuilder()
    .select("schedules")
    .from(Schedules, "schedules")
    .where("schedules.hour = :dataHour", { dataHour: data.hour })
    .andWhere("schedules.date = :dataDate", { dataDate: data.date })
    .andWhere("schedules.user = :idUser", {
      idUser: data.userId,
    })
    .andWhere("schedules.instructors = :idInstructor", {
      idInstructor: data.instructorsId,
    })
    .getOne();

  if (scheduleVerifyHourAndDate) {
    throw new AppError("Schedule unavailable", 409);
  }

  const schedule = scheduleRepository.create({
    ...data,
    user: userId,
    instructors: instructorId,
  });

  await scheduleRepository.save(schedule);

  return schedule;
};
