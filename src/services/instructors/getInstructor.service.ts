import AppDataSource from "../../data-source";
import { Instructors } from "../../entities/instructors.entity";

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
