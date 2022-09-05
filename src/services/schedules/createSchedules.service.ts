import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../error/AppError";
import { IScheduleRequest } from "../../interfaces/schedules";
import { listIDPropertieservice } from "../properties/listIDProperties.service";
const dataFixa = "2000/01/30 ";

export const createScheduleService = async (
  id: User,
  { date, hour, propertyId, userId }: IScheduleRequest
) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const hora = await verificaHora(hour);
  const data = await verificaData(date);
  const property = await listIDPropertieservice(propertyId);
  const indisponivel = property.schedules.some((agenda) => {
    return agenda.date === data && agenda.hour === hora;
  });
  if (indisponivel) {
    throw new AppError("Horario indisponível.");
  }
  const agenda = new Schedules();
  agenda.date = data;
  agenda.hour = hora;
  agenda.property = property;
  agenda.user = id;

  let newAgenda;
  try {
    newAgenda = await schedulesRepository.save(agenda);
  } catch (error) {
    if (error instanceof Error) {
      throw new AppError(error.message);
    }
  }
  return newAgenda;
};

export const verificaHora = (hour: string) => {
  const horaAgenda = new Date(dataFixa + hour).toTimeString();
  const horario = horaAgenda.split(" ")[0];

  if (horario.toLowerCase().includes("invalid")) {
    throw new AppError("Erro no formato do hora. Formato aceito 24H");
  }

  const hora = new Date(dataFixa + horaAgenda).getHours();
  const minuto = new Date(dataFixa + horaAgenda).getMinutes();

  if (hora < 8 || hora > 18) {
    throw new AppError(
      "Aberto apenas em horario comercial, entre as 08:00 e as 18:00"
    );
  }
  if ((hora === 8 && minuto === 0) || (hora === 18 && minuto !== 0)) {
    throw new AppError(
      "Aberto apenas em horario comercial, entre as 08:00 e as 18:00"
    );
  }
  return horario;
};
export const verificaData = (date: string) => {
  const dataAgenda = new Date(date).toLocaleDateString("zh");
  const dia = new Date(date).toDateString().split(" ")[0];
  if (dia === "Sat" || dia === "Sun") {
    throw new AppError("Fechados aos Sabados e Domingos");
  }
  return dataAgenda;
};
