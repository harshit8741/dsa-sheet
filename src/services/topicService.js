// import { prisma } from '../index.js';

// export const createTopic = async (name, level) => {
//   return prisma.topic.create({ data: { name, level } });
// };

// export const getAllTopics = async () => {
//   return prisma.topic.findMany({
//     include: { subtopics: true }
//   });
// };
import Topic from "../models/Topic.js";
import Subtopic from "../models/Subtopic.js";

export const createTopic = async ({ name, level }) => {
  return await Topic.create({ name, level });
};

export const getTopicsWithSubtopics = async () => {
  const topics = await Topic.find();
  return await Promise.all(
    topics.map(async (topic) => {
      const subtopics = await Subtopic.find({ topicId: topic._id });
      return { ...topic.toObject(), subtopics };
    })
  );
};
