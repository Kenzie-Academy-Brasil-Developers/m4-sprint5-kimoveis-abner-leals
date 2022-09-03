import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { AppError } from "../error/AppError";
import AppDataSource from "../data-source";
import { User } from "../entities/users.entity";

export const verifyIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);
  const { id } = req.params;

  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });
  if (!user) {
    throw new AppError("ID inválido", 404);
  }

  if (!user.isActive) {
    throw new AppError("ID inválido", 400);
  }

  next();
};
