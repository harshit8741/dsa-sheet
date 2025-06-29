import express from "express";
import { register, login } from "../controllers/authController.js";
import { addTopic, fetchTopics } from "../controllers/topicController.js";
import { addSubtopic, fetchSubtopics } from "../controllers/subtopicController.js";
import { updateProgress, getProgress } from "../controllers/progressController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/topics", addTopic);
router.get("/topics", fetchTopics);
router.post("/subtopics", addSubtopic);
router.get("/subtopics/:topicId", fetchSubtopics);
router.post("/progress", updateProgress);
router.get("/progress/:userId", getProgress);

export default router;
