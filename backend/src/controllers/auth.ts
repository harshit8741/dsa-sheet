import { loginSchema, registerSchema } from "../validators/index";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import CustomErrorHandler from "../services/customErrorHandler";
import authservice from "../services/authservice";
import { validateBody } from "../utils/validator";

const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerBody = validateBody(registerSchema, req.body);
      if (!registerBody.success) {
        return next(registerBody.error);
      }

      const exists = await authservice.checkUserAlreadyExists(
        registerBody.data.email
      );
      if (exists) {
        return next(
          CustomErrorHandler.alreadyExists("Email is already registered")
        );
      }

      const hashedPassword = await bcrypt.hash(registerBody.data.password, 10);
      const newUser = await authservice.createUser({
        username: registerBody.data.username,
        email: registerBody.data.email,
        password: hashedPassword,
      });
      res.status(201).json({
        message: "User registered successfully",
        user: newUser,
      });
    } catch (error) {
      return next(error);
    }
  },

  async login(res: Response, req: Request, next: NextFunction){
    try {
      const loginBody = validateBody(loginSchema, req.body);
      if(!loginBody.success){
        return next(loginBody.error);
      }

    } catch (error) {
      return next(error);
    }
  }
};

export default authController;
