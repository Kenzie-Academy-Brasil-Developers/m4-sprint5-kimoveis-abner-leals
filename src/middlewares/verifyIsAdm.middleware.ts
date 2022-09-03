import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { AppError } from "../error/AppError";

export const verifyIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (token) {
    token = token.replace("Bearer ", "");
  } else {
    throw new AppError("Missing Authorization Token", 401);
  }

  const { isAdm } = jwt.verify(
    token,
    process.env.SECRET_KEY ?? ""
  ) as jwt.JwtPayload;

  if (isAdm) {
    next();
  } else {
    throw new AppError("Unauthorized", 403);
  }
};
