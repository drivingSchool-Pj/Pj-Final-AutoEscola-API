import AppDataSource from "../../data-source"
import { Schedules } from "../../entities/schedules.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

export const listAllSchedulesInUserService = async (userId: any, isAdm: boolean, userAcess: string) =>{
  const schedulesRepository = AppDataSource.getRepository(Schedules)
  const userRepository = AppDataSource.getRepository(User)
  
  const user = await userRepository.findOneBy({id: userId})
  
  if(!user){
    throw new AppError("User is not exists")
  }
  
  if(userAcess !== user.id && !isAdm){
    throw new AppError("You are not authorized to use this route", 401)
  }

  const allSchedules = await schedulesRepository.find() 

  return allSchedules

}