import AppDataSource from "../../data-source"
import { Instructors } from "../../entities/instructors.entity"
import { Schedules } from "../../entities/schedules.entity"
import { User } from "../../entities/user.entity"

export const listAllSchedulesInIstructorService = async (instructorId: any, userAcess: string, isAdm:boolean) => {

  const userRepository = AppDataSource.getRepository(User)
  const schedulesRepository = AppDataSource.getRepository(Schedules)
  const instructorRepository = AppDataSource.getRepository(Instructors)

  const instructor1 = await userRepository.findOneBy({id: instructorId})
  
  const schedules = schedulesRepository.createQueryBuilder("schedules");

  const schedulesExist = await schedules.where("instructorsId = :idInstructor", { idInstructor: instructorId }).getOne();

  return schedulesExist

}