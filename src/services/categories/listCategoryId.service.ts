import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../error/AppError";

export const listCategoriesIDService = async (
  categoryID: string
): Promise<Categories> => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const category = await categoriesRepository.findOne({
    where: {
      id: categoryID,
    },
    relations: {
      properties: true,
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};
