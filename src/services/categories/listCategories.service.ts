import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";

export const listCategoryService = async (): Promise<Categories[]> => {
  const userRepository = AppDataSource.getRepository(Categories);

  const users = await userRepository.find();

  return users;
};
