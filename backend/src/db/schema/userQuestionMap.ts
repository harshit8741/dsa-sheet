import { pgTable, uuid, varchar, text, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { questions } from "./questions";
import { categories } from "./categories";

export const userQuestionStatus = pgTable("user_question_status", {
  userId: uuid("user_id").references(() => users.id).notNull(),
  questionId: uuid("question_id").references(() => questions.id).notNull(),
  categoryId: uuid("category_id").references(() => categories.id).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("unsolved"), //unsolved, solved, in-progress, revise
  note: text("note"),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.questionId] })
}));
