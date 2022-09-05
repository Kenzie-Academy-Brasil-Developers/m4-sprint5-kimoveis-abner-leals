import { compare } from "bcryptjs";
import "dotenv/config";
import * as jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../error/AppError";
import { IUserLogin } from "../../interfaces/users";

export const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!user || !user.isActive) {
    throw new AppError("Invalid email or password", 403);
  }

  const matchPassword = await compare(password, user.password);

  if (!matchPassword) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, isAdm: user.isAdm },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "2h",
    }
  );

  return token;
};
