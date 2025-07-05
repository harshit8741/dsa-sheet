import { pgTable, serial, uuid } from "drizzle-orm/pg-core";
import { questions } from "./questions";
import { topics } from "./topics";

export const questionTopicMap = pgTable("question_topic_map", {
  id: serial("id").primaryKey(),
  questionId: uuid("question_id").references(() => questions.id),
  topicId: uuid("topic_id").references(() => topics.id),
});
