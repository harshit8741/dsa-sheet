import { z } from "zod";

export const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const topicSchema = z.object({
  name: z.string(),
});

export const questionSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty")
    .max(255, "Title must be under 255 characters"),

  problemLink: z
    .string()
    .url("Problem link must be a valid URL")
    .max(500, "Link must be under 500 characters")
    .optional()
    .or(z.literal("").transform(() => undefined)),

  difficulty: z
    .enum(["easy", "medium", "hard"], {
      required_error: "Difficulty is required",
      invalid_type_error: "Difficulty must be 'easy', 'medium' or 'hard'",
    }),
});

export const categorySchema = z.object({
  name: z.string(),
});
