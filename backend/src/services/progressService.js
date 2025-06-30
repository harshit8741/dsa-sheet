import Progress from "../models/Progress.js";

export const updateProgress = async ({ userId, subtopicId, isDone }) => {
  return await Progress.findOneAndUpdate(
    { userId, subtopicId },
    { isDone },
    { new: true, upsert: true }
  );
};

export const getUserProgress = async (userId) => {
  return await Progress.find({ userId });
};
