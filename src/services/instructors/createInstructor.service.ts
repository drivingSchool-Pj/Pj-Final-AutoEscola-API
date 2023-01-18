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

  const instructors = await instructorsRep.find({
    relations: {
      user: true,
    },
  });

  const ExistsInst = instructors.some((elem) => elem.user.id === id);
  if (ExistsInst) throw new AppError("Instructor already exists", 400);

  const categoriesRep = AppDataSource.getRepository(Categories);
  const ExistCat = await categoriesRep.findOneBy({
    typeCategorie: category,
  });
  if (!ExistCat) throw new AppError("Category not found", 404);

  const user = instructorsRep.create({
    user: Exists,
    categories: ExistCat,
  });
  await instructorsRep.save(user);
};
