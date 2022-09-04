import { Router } from "express";

import {
  createPropiertiesController,
  listPropiertiesController,
} from "../controllers/properties.controller";
import { verifyIsAdmMiddleware } from "../middlewares/verifyIsAdm.middleware";
import { listPropertieservice } from "../services/properties/listProperties.service";

export const propertiesRoutes = Router();

propertiesRoutes.post("", verifyIsAdmMiddleware, createPropiertiesController);
propertiesRoutes.get("", listPropiertiesController);
