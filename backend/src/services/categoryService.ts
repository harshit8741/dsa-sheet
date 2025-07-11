import { db } from "../config/db";
import { categories } from "../db/schema/categories";
type Category = typeof categories.$inferInsert;

const categoryService = {
  async createCategory(categoryInfo: Category) {
    const newCategory = await db.insert(categories).values(categoryInfo).returning({
      id: categories.id,
      name: categories.name,
    });
    return newCategory[0];
  },

  async getCategory() {
    const category = await db.query.categories.findMany();
    return category;
  },
};

export default categoryService;
