import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import { createUserService } from "../services/users/createUser.service";
import { listUserService } from "../services/users/listUsers.service";
import { deleteUserService } from "../services/users/usersDelete.service";

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, isAdm, password }: IUserRequest = req.body;
  const user = await createUserService({ name, email, isAdm, password });
  return res.status(201).json(user);
};
export const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();
  return res.status(200).json(users);
};
export const deleteUserController = async (req: Request, res: Response) => {
  const users = await deleteUserService(req, res);
  return res.status(204).json(users);
};
