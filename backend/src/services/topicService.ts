import { db } from "../config/db";
import { topics } from "../db/schema/topics";
type Topic = typeof topics.$inferInsert;

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
};

export default topicService;
