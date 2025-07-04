import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { questions } from "./questions";
import { topics } from "./topics";

export const questionTopicMap = pgTable("question_topic_map", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").references(() => questions.id),
  topicId: integer("topic_id").references(() => topics.id),
});
