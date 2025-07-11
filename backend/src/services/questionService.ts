import { db } from "../config/db";
import { eq, and } from "drizzle-orm";
import { questions } from "../db/schema";
import { questionTopicMap } from "../db/schema";
import { userQuestionStatus } from "../db/schema";
type Question = typeof questions.$inferInsert;
type QuestionTopicMap = typeof questionTopicMap.$inferInsert;
type UserQuestionStatus = typeof userQuestionStatus.$inferInsert;

const questionService = {
  async createQuestion(questionInfo: Question) {
    const newQuestion = await db
      .insert(questions)
      .values(questionInfo)
      .returning({
        id: questions.id,
        title: questions.title,
        problemLink: questions.problemLink,
        difficulty: questions.difficulty,
      });
    return newQuestion[0];
  },

  async getQuestionsByTopic(topicId: string) {
    const result = await db
      .select({
        id: questions.id,
        title: questions.title,
        problemLink: questions.problemLink,
        difficulty: questions.difficulty,
      })
      .from(questionTopicMap)
      .innerJoin(questions, eq(questionTopicMap.questionId, questions.id))
      .where(eq(questionTopicMap.topicId, topicId));

    return result;
  },

  async mapQuestionTopic(questionInfo: QuestionTopicMap) {
    await db.insert(questionTopicMap).values(questionInfo);
    return;
  },

  async addUserQuestionStatus(progressInfo: UserQuestionStatus) {
    const progress = await db
      .insert(userQuestionStatus)
      .values(progressInfo)
      .returning({
        userId: userQuestionStatus.userId,
        questionId: userQuestionStatus.questionId,
        status: userQuestionStatus.status,
        note: userQuestionStatus.note,
      });

    return progress[0];
  },

  async getProgressByUserAndCategory (userId: string, categoryId: string) {
    return db
      .select({
        questionId: questions.id,
        difficulty: questions.difficulty,
        status: userQuestionStatus.status,
        note: userQuestionStatus.note,
      })
      .from(userQuestionStatus)
      .innerJoin(questions, eq(userQuestionStatus.questionId, questions.id))
      .where(
        and(
          eq(userQuestionStatus.userId, userId),
          eq(userQuestionStatus.categoryId, categoryId)
        )
      );
  },
};

export default questionService;
