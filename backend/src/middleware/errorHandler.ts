import CustomErrorHandler from '../services/customErrorHandler';
import { Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response): void => {
    let statusCode = 500;
    let data = {
        message: "An unexpected error occurred",
    };
    
    if (err instanceof CustomErrorHandler) {
        statusCode = err.status;
        data.message = err.message;
    } else if (err instanceof Error) {
        data.message = err.message;
    }

    res.status(statusCode).json(data);
};

export default errorHandler;