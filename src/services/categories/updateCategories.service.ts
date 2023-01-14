import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryData } from "../../interfaces/categories";

export const updateCategoryService = async (
  categoryData: ICategoryData,
  CategoryId: string
) => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const findCategory = await categoryRepository.findOneBy({
    id: CategoryId,
  });

  if (!findCategory) {
    throw new AppError("Category Not Exists ", 404);
  }
  const updatedCategory = categoryRepository.create({
    ...findCategory,
    ...categoryData,
  });

  await categoryRepository.save(updatedCategory);

  return updatedCategory;
};
