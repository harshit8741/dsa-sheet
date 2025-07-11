import { pgTable, serial, uuid } from "drizzle-orm/pg-core";
import { topics } from "./topics";
import { categories } from "./categories";

export const topicCategoryMap = pgTable("topic_category_map", {
  id: serial("id").primaryKey(),
  categoryId: uuid("category_id").references(() => categories.id),
  topicId: uuid("topic_id").references(() => topics.id),
});
