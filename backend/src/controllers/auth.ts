import {registerSchema} from '../validators/index';
import { Request, Response, NextFunction } from 'express';

const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
        const registerBody = registerSchema.safeParse(req.body);
        if(!registerBody.success){
            return next(registerBody.error)
        }
        
    } catch (error) {
        return next(error);
    }
  },
};

export default authController;
