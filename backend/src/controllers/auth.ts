import { registerSchema } from "../validators/index";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import CustomErrorHandler from "../services/customErrorHandler";
import authservice from "../services/authservice";
const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerBody = registerSchema.safeParse(req.body);
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
};

export default authController;
