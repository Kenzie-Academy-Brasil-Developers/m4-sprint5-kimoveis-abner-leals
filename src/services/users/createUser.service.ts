import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../error/AppError";
import { IUser, IUserRequest } from "../../interfaces/users";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const userFind = await userRepository.findOne({
    where: {
      email: userData.email,
    },
  });
  if (userFind) {
    throw new AppError("Usuário ja cadastrado.");
  }

  userData.password = await hash(userData.password, 10);

  const user = userRepository.create({
    ...userData,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await userRepository.save(user);

  const { password, ...newUser } = user;

  return newUser;
};
