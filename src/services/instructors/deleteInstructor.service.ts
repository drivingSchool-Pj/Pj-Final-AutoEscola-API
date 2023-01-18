import AppDataSource from "../../data-source";
import { Instructors } from "../../entities/instructors.entity";
import { AppError } from "../../errors/appError";

export const deleteInstructorService = async (id: string) => {
  const instRepo = AppDataSource.getRepository(Instructors);
  const foundInst = await instRepo.findOneBy({ id: id });

  if (!foundInst) {
    throw new AppError("Instructor not found", 404);
  }

  await instRepo.delete({ id: id });

  return;
};
