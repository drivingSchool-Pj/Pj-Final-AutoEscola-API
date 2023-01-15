import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { Instructors } from "../../entities/instructors.entity";
import { AppError } from "../../errors/appError";

export const listCategorieForInstructorService = async (
  categoryId: string,
  adm: boolean,
  userId: string
) => {
  if (!adm) {
    throw new AppError("user is not adm!", 403);
  }

  const categoriesRepository = AppDataSource.getRepository(Categories);

  const findCategory = await categoriesRepository.findOneBy({
    id: categoryId,
  });

  if (!findCategory) {
    throw new AppError("invalid category id!", 404);
  }

  const instructorsRepository = AppDataSource.getRepository(Instructors);

  const findInstructor = await instructorsRepository
    .createQueryBuilder("instructors")
    .leftJoinAndSelect("instructors.user", "user", "instructors.user = user.id")
    .where("instructors.categories = :id", { id: categoryId })
    .getOne();

  return findInstructor;
};
