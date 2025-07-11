import { db } from "../config/db";
import { questions } from "../db/schema/questions";
import { questionTopicMap } from "../db/schema/questionTopicMap";
type Question = typeof questions.$inferInsert;
type QuestionTopicMap = typeof questionTopicMap.$inferInsert;

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

  async getTopic() {
    const topic = await db.query.topics.findMany();
    return topic;
  },

  async mapQuestionTopic(questionInfo: QuestionTopicMap) {
    await db.insert(questionTopicMap).values(questionInfo);
    return;
  },
};

export default questionService;
