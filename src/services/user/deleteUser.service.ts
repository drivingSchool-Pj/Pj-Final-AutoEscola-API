import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

export const softDeleteUserService = async (userId: string) => {

  const userRepository = AppDataSource.getRepository(User)
  const foundUser = await userRepository.findOneBy({id: userId})
  
  if(!foundUser){
    throw new AppError("user is already inactive", 404)
  }

  await userRepository.softRemove(foundUser)
  
  await userRepository.save({...foundUser, isActive: false})

  return {}
}