import AppDataSource from "../../data-source";
import { Instructors } from "../../entities/instructors.entity";
import { AppError } from "../../errors/appError";

export const getAllInstructorsService = async () => {
  const repInst = AppDataSource.getRepository(Instructors);

  const data = await repInst.find({
    relations: {
      user: true,
      categories: true,
    },
  });

  return data;
};

export const getOneInstructorService = async (id: string) => {
  try {
    const instRepo = AppDataSource.getRepository(Instructors);

    const res = await instRepo.findOneBy({
      id: id,
    });

    return res;
  } catch (err) {
    throw new AppError("Invalid id", 400);
  }
};
