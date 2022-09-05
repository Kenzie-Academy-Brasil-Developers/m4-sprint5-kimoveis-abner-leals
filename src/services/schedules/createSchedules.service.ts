import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../error/AppError";
import { IScheduleRequest } from "../../interfaces/schedules";
import { listIDPropertieservice } from "../properties/listIDProperties.service";

export const createScheduleService = async (
  id: User,
  { date, hour, propertyId, userId }: IScheduleRequest
) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const property = await listIDPropertieservice(propertyId);

  const scheduleDateString = new Date(date).toLocaleDateString("zh");
  const scheduleDateDay = new Date(date).toDateString().split(" ")[0];
  if (scheduleDateDay === "Sat" || scheduleDateDay === "Sun") {
    throw new AppError("Fechados aos Sabados e Domingos");
  }

  if (hour.length !== 5) {
    throw new AppError("Formato de hora incorreto");
  }
  const scheduleHourString = new Date("2000/01/30 " + hour);

  const hora = scheduleHourString.getHours();
  const minuto = scheduleHourString.getMinutes();
  if (hora < 8 || hora > 18) {
    throw new AppError("Horario de agendamento apenas entre as 8H e as 18H");
  } else if (hora === 8 || hora === 18) {
    if (minuto !== 0) throw new AppError("Agendamentos apenas entre 8H e 18H");
  }
  hour = scheduleHourString.toTimeString().split(" ")[0];
  date = scheduleDateString;
  const horarioDiponivel = property.schedules.some((agenda) => {
    return agenda.date === date && agenda.hour === hour;
  });

  if (horarioDiponivel) throw new AppError("horario indisponivel");
  const agenda = new Schedules();
  agenda.date = date;
  agenda.hour = hour;
  agenda.property = property;
  agenda.user = id!;

  let newagenda;
  try {
    newagenda = await schedulesRepository.save(agenda);
  } catch (error) {
    if (error instanceof Error) throw new AppError(error.message);
  }
  return newagenda;
};
