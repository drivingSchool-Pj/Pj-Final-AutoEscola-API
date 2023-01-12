import AppDataSource from "../../data-source";

import { compare } from "bcryptjs";
import { IUserLogin } from "../../interfaces/login";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createLoginService = async (data: IUserLogin) => {
  const { email, password } = data;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email: email });

  if (!user) throw new AppError("User or password invalid!", 403);

  const pass = await compare(password, user.password);
  if (!pass) throw new AppError("User or password invalid!", 403);

  if (!user.isActive) throw new AppError("User is not active!", 400);

  console.log(user.id);
  const token = jwt.sign(
    { isAdm: user.isAdm, id: user.id },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );
  return token;
};
