import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validator";
import { categorySchema } from "../validators";
import categoryService from "../services/categoryService";
import { sendResponse } from "../utils/response";

const categoryController = {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryBody = validateBody(categorySchema, req.body);
      if (!categoryBody.success) {
        return next(categoryBody.error);
      }

      const { name } = categoryBody.data;
      const category = await categoryService.createCategory({ name });
      sendResponse(res, "Category created successfully", category, "CREATED");
    } catch (error) {
      return next(error);
    }
  },

  async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.getCategory();
      sendResponse(res, "Category fetched successfully", categories, "SUCCESS");
    } catch (error) {
      return next(error);
    }
  },
};

export default categoryController;
