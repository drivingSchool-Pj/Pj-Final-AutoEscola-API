import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/appError"

export const softDeleteUserService = async (userId: string): Promise<User>=> {

  const userRepository = AppDataSource.getRepository(User)
  const foundUser = await userRepository.findOneBy({id: userId})

  if(foundUser.isActive === false){
    throw new AppError("user is already inactive", 404)
  }

  await userRepository.softRemove(foundUser)
  
  const user = await userRepository.save({...foundUser, status: "removed"})

  return user
  
}