import AppDataSource from '../../data-source'
import { User } from '../../entities/user.entity'
import { AppError } from '../../errors/appError'
import { IUserRequest } from '../../interfaces/user'
import { userWithoutPasswordValidation } from '../../validations/schemas'

export const createUserService = async (
  userData: IUserRequest
): Promise<IUserRequest> => {
  const userRepository = AppDataSource.getRepository(User)

  const userFind = await userRepository.findAndCountBy({
    email: userData.email
  })

  if (userFind[1] > 0) {
    throw new AppError('Email already exists!', 409)
  }

  if (userData.age > 99) {
    throw new AppError('Age number cannot be greater than 99!', 409)
  }

  if (
    userData.typeCategorie !== 'A' &&
    userData.typeCategorie !== 'AB' &&
    userData.typeCategorie !== 'B' &&
    userData.typeCategorie !== 'C' &&
    userData.typeCategorie !== 'D' &&
    userData.typeCategorie !== 'E'
  ) {
    throw new AppError('the wallet type must be A, B, C, D, E!', 409)
  }

  const userCreate = userRepository.create(userData)
  await userRepository.save(userCreate)

  const userWithoutPassword = await userWithoutPasswordValidation.validate(
    userCreate,
    {
      stripUnknown: true
    }
  )

  return userWithoutPassword
}
