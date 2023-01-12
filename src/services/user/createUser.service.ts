import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces/user/user.interface";

import { userWithoutPasswordValidation } from "../../validations/schemas";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUserRequest> => {
  const { address } = userData;
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const userFind = await userRepository.findAndCountBy({
    email: userData.email,
  });

  if (userFind[1] > 0) {
    throw new AppError("Email already exists!", 409);
  }

  if (userData.age > 99) {
    throw new AppError("Age number cannot be greater than 99!", 409);
  }

  const newAddress = addressRepository.create(address);

  await addressRepository.save(newAddress);

  const userCreate = userRepository.create({
    ...userData,
    address: newAddress,
  });
  await userRepository.save(userCreate);

  const userWithoutPassword = await userWithoutPasswordValidation.validate(
    userCreate,
    {
      stripUnknown: true,
    }
  );

  return userWithoutPassword;
};
