import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

export const deleteCategoryService = async (categoryId: string) => {
  const categoryRepository = AppDataSource.getRepository(Categories);
  const foundCategory = await categoryRepository.findOneBy({ id: categoryId });

  if (!foundCategory) {
    throw new AppError("user is already inactive", 404);
  }

  await categoryRepository.softRemove(foundCategory);

  await categoryRepository.save({ ...foundCategory});

  return;
};
