import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  listUserController,
} from "../controllers/users.controller";
import { verifyIsActiveMiddleware } from "../middlewares/verifyIsActive.middleware";

import { verifyIsAdmMiddleware } from "../middlewares/verifyIsAdm.middleware";

export const usersRoutes = Router();

usersRoutes.post("", createUserController);
usersRoutes.get("", verifyIsAdmMiddleware, listUserController);
usersRoutes.delete(
  "/:id",
  verifyIsAdmMiddleware,
  verifyIsActiveMiddleware,
  deleteUserController
);
