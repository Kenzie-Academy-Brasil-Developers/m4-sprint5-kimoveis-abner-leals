import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../error/AppError";

export const listScheduleService = async (propertyId: string) => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const property = await propertiesRepository.findOne({
    where: { id: propertyId },
  });
  if (!property) throw new AppError("Propiedade inexistente", 404);
  if (property.schedules.length === 0)
    throw new AppError("Propiedade não contem agendamento", 404);

  return property;
};
