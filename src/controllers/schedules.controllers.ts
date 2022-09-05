import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";
import { AppError } from "../error/AppError";
import { createScheduleService } from "../services/schedules/createSchedules.service";
import { listScheduleService } from "../services/schedules/listSchedules.service";
export const createSchedulesController = async (
  req: Request,
  res: Response
) => {
  const userRepository = AppDataSource.getRepository(User);
  let token = req.headers.authorization;

  if (token) {
    token = token.replace("Bearer ", "");
  } else {
    throw new AppError("Missing Authorization Token", 401);
  }

  const { id } = jwt.verify(
    token,
    process.env.SECRET_KEY ?? ""
  ) as jwt.JwtPayload;

  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });
  const agenda = await createScheduleService(user!, req.body);
  return res.status(201).json({ message: "schedule created" });
};

export const listScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const output = await listScheduleService(id);
  return res.status(200).json(output);
};
