import Subtopic from "../models/Subtopic.js";

export const createSubtopic = async (data) => {
  return await Subtopic.create(data);
};

export const getSubtopicsByTopic = async (topicId) => {
  return await Subtopic.find({ topicId });
};
