import AppDataSource from "../../data-source";
import { Instructors } from "../../entities/instructors.entity";
import { AppError } from "../../errors/appError";

export const listCategorieForInstructorService = async (
  instructorId: string,
  adm: boolean
) => {
  if (!adm) {
    throw new AppError("user is not adm!", 403);
  }

  const instructorsRepository = AppDataSource.getRepository(Instructors);
  const instructorFind = await instructorsRepository.findOneBy({
    id: instructorId,
  });

  if (!instructorFind) {
    throw new AppError("invalid instructor id!", 404);
  }

  const findInstructor = await instructorsRepository.findOne({
    where: { id: instructorId },
    relations: { categories: true },
  });

  return findInstructor;
};
