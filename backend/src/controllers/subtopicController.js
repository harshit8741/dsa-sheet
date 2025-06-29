import * as SubtopicService from "../services/subtopicService.js";

export const addSubtopic = async (req, res) => {
  try {
    const subtopic = await SubtopicService.createSubtopic(req.body);
    res.json(subtopic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const fetchSubtopics = async (req, res) => {
  try {
    const subtopics = await SubtopicService.getSubtopicsByTopic(req.params.topicId);
    res.json(subtopics);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
