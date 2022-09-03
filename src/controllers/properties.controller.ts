import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import { createPropertieService } from "../services/properties/createproperties.service";

export const createPropiertiesController = async (
  req: Request,
  res: Response
) => {
  const prop: IPropertyRequest = req.body;
  const propiertie = await createPropertieService(prop);
  return res.status(201).json(propiertie);
};
// export const listPropiertiesController = async (
//   req: Request,
//   res: Response
// ) => {
//   const cats = await listCategoryService();
//   return res.status(200).json(cats);
// };
// export const deletePropiertiesController = async (
//   req: Request,
//   res: Response
// ) => {
//   return res.status(204).json();
// };
