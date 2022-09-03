import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../error/AppError";

export const verifyTokenMiddleware = (
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

  jwt.verify(token, "SECRET_KEY", (error, decoded) => {
    console.log(decoded);
    if (error) {
      throw new AppError("Invalid Token", 401);
    }
  });
  next();
};
