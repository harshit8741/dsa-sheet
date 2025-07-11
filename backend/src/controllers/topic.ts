import { Request, Response, NextFunction } from "express";
import { validateBody } from "../utils/validator";
import { topicSchema } from "../validators";
import topicService from "../services/topicservice";
import { sendResponse } from "../utils/response";

const topicController = {
  async createTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const topicBody = validateBody(topicSchema, req.body);
      if (!topicBody.success) {
        return next(topicBody.error);
      }

      const { name, categoryId } = topicBody.data;
      const topic = await topicService.createTopic({ name });
      await topicService.mapTopicToCategory({
        topicId: topic.id,
        categoryId,
      });
      sendResponse(res, "Topic created successfully", topic, "CREATED");
    } catch (error) {
      return next(error);
    }
  },

  async getTopic(req: Request, res: Response, next: NextFunction) {
    try {
        const { categoryId } = req.params;
      const topics = await topicService.getQuestionsByTopic(categoryId);
      sendResponse(res, "Topic fetched successfully", topics, "SUCCESS");
    } catch (error) {
      return next(error);
    }
  },
};

export default topicController;
