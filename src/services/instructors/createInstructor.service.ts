import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { Instructors } from "../../entities/instructors.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IInstructorCreate } from "../../interfaces/instructors";
import { isValidUUIDV4 } from "is-valid-uuid-v4";

export const createInstructorService = async (
  data: IInstructorCreate
): Promise<void> => {
  const { id, category } = data;

  if (!isValidUUIDV4(id)) throw new AppError("Invalid uuid", 400);

  const usersRep = AppDataSource.getRepository(User);
  const Exists = await usersRep.findOneBy({
    id: id,
  });
  if (!Exists) throw new AppError("User not found", 404);

  const instructorsRep = AppDataSource.getRepository(Instructors);

  const ExistsInst = await instructorsRep.findOneBy({
    id: id,
  });
  if (ExistsInst) throw new AppError("Instructor already exists", 400);

  const categoriesRep = AppDataSource.getRepository(Categories);

  if (category.length > 2)
    throw new AppError("Category must be 2 characters", 400);

  const user = instructorsRep.create({
    user: Exists,
  });
  await instructorsRep.save(user);

  const categories = categoriesRep.create({
    typeCategorie: category,
  });

  await categoriesRep.save(categories);
};
