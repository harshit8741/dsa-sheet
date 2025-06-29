import dotenv from "dotenv";
dotenv.config();

export default {
  APP_PORT: process.env.APP_PORT,
  DATABASE_URL: process.env.DATABASE_URL,
};
