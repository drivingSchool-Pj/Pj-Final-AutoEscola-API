import AppDataSource from "../../data-source";
import { Instructors } from "../../entities/instructors.entity";

export const getAllInstructorsService = async () => {
  const repInst = AppDataSource.getRepository(Instructors);
  const query = await repInst
    .createQueryBuilder("instructors")
    .leftJoinAndSelect("instructors.user", "user")
    .leftJoinAndSelect("instructors.categories", "categories")
    .getMany();
  const data = query.map((item) => {
    const { user, categories, ...rest } = item;
    return {
      ...rest,
      user_id: user.id,
      user_name: user.name,
      user_email: user.email,
      user_age: user.age,
      user_contact: user.contact,
      user_category: categories.typeCategorie,
    };
  });
  return data;
};
