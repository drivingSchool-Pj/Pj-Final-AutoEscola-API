import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { listUserWithoutPasswordValidation } from "../../validations/schemas";

export const listUserService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const listUser = await userRepository.find();

  console.log(listUser);
  const listUserWithoutPassword =
    await listUserWithoutPasswordValidation.validate(listUser, {
      stripUnknown: true,
    });

  return listUserWithoutPassword;
};
