import express from "express";
import cors from "cors";
import { testConnection } from "./config/db";
import config from './config/index';
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await testConnection();
    
    app.use("/api", routes);
    
    app.listen(config.APP_PORT, () => {
      console.log(`Server running on port ${config.APP_PORT}`);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();