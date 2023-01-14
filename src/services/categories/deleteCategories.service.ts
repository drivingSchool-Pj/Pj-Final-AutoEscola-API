import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";

export const softDeleteCategoryService = async (categoryId: string) => {
  const categoryRepository = AppDataSource.getRepository(Categories);
  const foundCategory = await categoryRepository.findOneBy({ id: categoryId });

  if (!foundCategory) {
    throw new AppError("category is already inactive", 404);
  }

  await categoryRepository.softRemove(foundCategory);

  await categoryRepository.save({ ...foundCategory, isActive: false });

  return;
};
