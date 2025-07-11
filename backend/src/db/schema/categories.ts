import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});
