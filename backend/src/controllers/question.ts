import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validator";
import { questionSchema, userQuestionProgressSchema } from "../validators";
import questionService from "../services/questionService";
import { sendResponse } from "../utils/response";
import CustomErrorHandler from "../services/customErrorHandler";

const questionController = {
  async createQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const questionBody = validateBody(questionSchema, req.body);
      if (!questionBody.success) {
        return next(questionBody.error);
      }

      const { title, problemLink, difficulty, topicId } = questionBody.data;
      const question = await questionService.createQuestion({
        title,
        problemLink,
        difficulty,
      });
      await questionService.mapQuestionTopic({
        questionId: question.id,
        topicId,
      });
      sendResponse(res, "Question created successfully", question, "CREATED");
    } catch (error) {
      return next(error);
    }
  },

  async getQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const { topicId } = req.params;
      const questions = await questionService.getQuestionsByTopic(topicId);
      sendResponse(res, "Questions fetched successfully", questions, "SUCCESS");
    } catch (error) {
      return next(error);
    }
  },

  async saveProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const progressBody = validateBody(userQuestionProgressSchema, req.body);
      if (!progressBody.success) {
        return next(progressBody.error);
      }

      const { userId, questionId, categoryId, status, note } =
        progressBody.data;
      const progress = await questionService.addUserQuestionStatus({
        userId,
        questionId,
        categoryId,
        status,
        note,
      });
      sendResponse(res, "Progress saved successfully", progress, "UPDATED");
    } catch (error) {
      return next(error);
    }
  },

  async getUserCategoryQuestions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.query.userId as string | undefined;
      const categoryId = req.query.categoryId as string | undefined;

      if (!userId?.trim() || !categoryId?.trim()) {
        return next(
          CustomErrorHandler.badRequest(
            "User ID and Category ID must be provided as query parameters"
          )
        );
      }

      const questions = await questionService.getProgressByUserAndCategory(
        userId,
        categoryId
      );

      sendResponse(
        res,
        "User Progress fetched successfully",
        questions,
        "SUCCESS"
      );
    } catch (error) {
      next(error);
    }
  },
};

export default questionController;
