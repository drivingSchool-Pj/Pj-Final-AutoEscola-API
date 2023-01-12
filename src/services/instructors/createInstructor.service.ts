import AppDataSource from "../../data-source";
import { Instructors } from "../../entities/instructors.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IInstructorCreate } from "../../interfaces/instructors";

export const createInstructorService = async (
  data: IInstructorCreate
): Promise<void> => {
  const { id } = data;
  const usersRep = AppDataSource.getRepository(User);
  const Exists = await usersRep.findOneBy({
    id: id,
  });
  if (!Exists) throw new AppError("User not found", 404);

  const instructorsRep = AppDataSource.getRepository(Instructors);
  const user = instructorsRep.create({});
  await instructorsRep.save(user);
};
