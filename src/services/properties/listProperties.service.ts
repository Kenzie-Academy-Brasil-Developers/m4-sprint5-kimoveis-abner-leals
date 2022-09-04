import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

export const listPropertieservice = async (): Promise<Properties[]> => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const properties = await propertiesRepository.find({
    relations: { category: true },
  });

  return properties;
};
