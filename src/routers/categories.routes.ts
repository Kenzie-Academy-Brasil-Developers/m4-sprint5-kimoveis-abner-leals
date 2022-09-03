import { Router } from "express";
import {
  createCategoryController,
  listCategoryController,
} from "../controllers/categories.controller";
import { verifyIsAdmMiddleware } from "../middlewares/verifyIsAdm.middleware";

export const categoriesRoutes = Router();

categoriesRoutes.post("", verifyIsAdmMiddleware, createCategoryController);
categoriesRoutes.get("", listCategoryController);
categoriesRoutes.get("/:id/properties");
