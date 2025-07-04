import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  problemLink: varchar("problem_link", { length: 500 }),
  difficulty: varchar("difficulty", { length: 50 }),                 // Difficulty (easy/medium/hard)
});
