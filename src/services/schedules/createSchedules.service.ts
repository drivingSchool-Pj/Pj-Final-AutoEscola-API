import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";
import { Location } from "../../entities/location.entity";
import { Instructors } from "../../entities/instructors.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules/schedules.interface";
import { User } from "../../entities/user.entity";

export const createSchedulesService = async (data: IScheduleRequest) => {
  const { date, hour, locationId, userId, instructorsId } = data;

  const scheduleRepository = AppDataSource.getRepository(Schedules);
  const locationRespository = AppDataSource.getRepository(Location);
  const userRespository = AppDataSource.getRepository(User);
  const instructorRespository = AppDataSource.getRepository(Instructors);

  const location = await locationRespository.findOneBy({
    id: locationId,
  });

  const instructor = await instructorRespository.findOneBy({
    id: instructorsId,
  });

  const user = await userRespository.findOneBy({
    id: userId,
  });

  if (!instructor) {
    throw new AppError("Instructor not found", 404);
  } else if (!user) {
    throw new AppError("User not found", 404);
  } else if (!location) {
    throw new AppError("Location not found", 404);
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
    user: user,
    instructors: instructor,
    location: location,
  });

  await scheduleRepository.save(schedule);

  return schedule;
};
