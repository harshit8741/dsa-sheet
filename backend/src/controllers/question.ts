import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validator";
import { questionSchema } from "../validators";
import questionService from "../services/questionService";
import { sendResponse } from "../utils/response";

const questionController = {
  async createQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const questionBody = validateBody(questionSchema, req.body);
      if (!questionBody.success) {
        return next(questionBody.error);
      }

      const { title, problemLink, difficulty } = questionBody.data;
      const topic = await questionService.createQuestion({ title, problemLink, difficulty });
      sendResponse(res, "Question created successfully", topic, "CREATED");
    } catch (error) {
      return next(error);
    }
  },

  async getTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await topicService.getTopic();
      sendResponse(res, "Topic fetched successfully", topics, "SUCCESS");
    } catch (error) {
      return next(error);
    }
  },
};

export default questionController;
