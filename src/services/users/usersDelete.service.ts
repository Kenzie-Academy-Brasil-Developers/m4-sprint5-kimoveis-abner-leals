import { Request, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../error/AppError";

export const deleteUserService = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const { id } = req.params;

  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });
  if (user) {
    user.isActive = false;
    await userRepository.save(user);
    return user;
  }
};
