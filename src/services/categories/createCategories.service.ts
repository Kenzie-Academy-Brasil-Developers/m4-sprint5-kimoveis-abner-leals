import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../error/AppError";
import { ICategoryRequest } from "../../interfaces/categories";

export const createCategoryService = async (
  category: ICategoryRequest
): Promise<Categories> => {
  const userRepository = AppDataSource.getRepository(Categories);

  const userFind = await userRepository.findOne({
    where: {
      name: category.name,
    },
  });
  if (userFind) {
    throw new AppError("Categoria ja cadastrado.");
  }

  const cat = userRepository.create(category);
  await userRepository.save(cat);

  return cat;
};
