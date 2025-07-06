import { loginSchema, registerSchema } from "../validators/index";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import CustomErrorHandler from "../services/customErrorHandler";
import authservice from "../services/authservice";
import { validateBody } from "../utils/validator";
import authService from "../services/authservice";
import jwt from "../services/jwt";
import { sendResponse } from "../utils/response";

const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerBody = validateBody(registerSchema, req.body);
      if (!registerBody.success) {
        return next(registerBody.error);
      }

      const { username, email, password } = registerBody.data;

      const exists = await authservice.checkUserAlreadyExists(email);
      if (exists) {
        return next(
          CustomErrorHandler.alreadyExists("Email is already registered")
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await authservice.createUser({
        username: username,
        email: email,
        password: hashedPassword,
      });
      sendResponse(res, "User Signup successfully", newUser, "SUCCESS");
    } catch (error) {
      return next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginBody = validateBody(loginSchema, req.body);
      if (!loginBody.success) {
        return next(loginBody.error);
      }

      const { email, password } = loginBody.data;
      const exists = await authService.checkUserAlreadyExists(email);
      if (!exists) {
        return next(CustomErrorHandler.notFound("Email is not registered"));
      }

      const user = await authService.getUser(email);
      const match =
        user?.password && (await bcrypt.compare(password, user.password));
      if (!match) {
        return next(CustomErrorHandler.notAuthorized("Incorrect password"));
      }

      const payload = { email, userId: user.id, role: user.role };
      const accessToken = jwt.registerAccessToken(payload);
      const refreshToken = jwt.registerRefreshToken(payload);

      sendResponse(
        res,
        "User login successfully",
        { accessToken, refreshToken },
        "SUCCESS"
      );
    } catch (error) {
      return next(error);
    }
  },
};

export default authController;
