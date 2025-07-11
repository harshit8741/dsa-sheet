import { db } from "../config/db";
import { eq } from "drizzle-orm";
import { topics } from "../db/schema/topics";
import { topicCategoryMap } from "../db/schema/topicCategoryMap";
type Topic = typeof topics.$inferInsert;
type TopicCategoryMap = typeof topicCategoryMap.$inferInsert;

const topicService = {
  async createTopic(topicInfo: Topic) {
    const newTopic = await db.insert(topics).values(topicInfo).returning({
      id: topics.id,
      name: topics.name,
    });
    return newTopic[0];
  },

  async getTopic() {
    const topic = await db.query.topics.findMany();
    return topic;
  },

  async mapTopicToCategory(topicInfo: TopicCategoryMap) {
    await db.insert(topicCategoryMap).values(topicInfo);
    return;
  },

  async getQuestionsByTopic(categoryId: string) {
    const result = await db
      .select({
        id: topics.id,
        name: topics.name,
      })
      .from(topicCategoryMap)
      .innerJoin(topics, eq(topicCategoryMap.topicId, topics.id))
      .where(eq(topicCategoryMap.categoryId, categoryId));

    return result;
  },
};

export default topicService;
