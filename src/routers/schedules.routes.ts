import { Router } from "express";
import {
  createSchedulesController,
  listScheduleController,
} from "../controllers/schedules.controllers";
import { verifyIsAdmMiddleware } from "../middlewares/verifyIsAdm.middleware";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

export const schedulesRoutes = Router();

schedulesRoutes.post("", createSchedulesController);
schedulesRoutes.get(
  "properties/:id",
  verifyIsAdmMiddleware,
  listScheduleController
);
