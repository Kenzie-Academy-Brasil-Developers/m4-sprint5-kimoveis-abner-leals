import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import { createCategoryService } from "../services/categories/createCategories.service";
import { listCategoryService } from "../services/categories/listCategories.service";
import { listCategoriesIDService } from "../services/categories/listCategoryId.service";

export const createCategoryController = async (req: Request, res: Response) => {
  const { name }: ICategoryRequest = req.body;
  const cat = await createCategoryService({ name });
  return res.status(201).json(cat);
};
export const listCategoryController = async (req: Request, res: Response) => {
  const cats = await listCategoryService();
  return res.status(200).json(cats);
};
export const listCategoryIDController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cats = await listCategoriesIDService(id);
  return res.status(200).json(cats);
};
