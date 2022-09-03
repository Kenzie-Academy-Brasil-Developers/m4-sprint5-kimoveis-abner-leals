import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../error/AppError";
import { IPropertyRequest } from "../../interfaces/properties";

export const createPropertieService = async (
  property: IPropertyRequest
): Promise<Properties> => {
  const addressRepository = AppDataSource.getRepository(Addresses);
  const categoryRepository = AppDataSource.getRepository(Categories);
  const propertieRepository = AppDataSource.getRepository(Properties);

  const address = await addressRepository.findOneBy(property.address);
  const category = await categoryRepository.findOneBy({
    id: property.categoryId,
  });

  if (!category) {
    throw new AppError(
      " Its not able to create property with invalid categoryId",
      404
    );
  }
  if (address) {
    throw new AppError(" Address its alredy been used", 400);
  }
  const addr = addressRepository.create(property.address);
  const prop = propertieRepository.create({
    address: addr,
    category: category,
  });
  await propertieRepository.save(prop);
  return prop;
};
