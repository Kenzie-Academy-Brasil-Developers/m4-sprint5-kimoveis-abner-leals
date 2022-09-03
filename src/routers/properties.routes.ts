import { Router } from "express";

import { createPropiertiesController } from "../controllers/properties.controller";
import { verifyIsAdmMiddleware } from "../middlewares/verifyIsAdm.middleware";

export const propertiesRoutes = Router();

propertiesRoutes.post("", verifyIsAdmMiddleware, createPropiertiesController);
// propertiesRoutes.get("", listCategoryController);
// propertiesRoutes.get("/:id/properties");
