import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../error/AppError";

export const listIDPropertieservice = async (id: string) => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const properties = await propertiesRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!properties) throw new AppError("Propriedade não encontrada", 404);

  return properties;
};
