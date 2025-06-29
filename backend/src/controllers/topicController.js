import * as TopicService from "../services/topicService.js";

export const addTopic = async (req, res) => {
  try {
    const topic = await TopicService.createTopic(req.body);
    res.json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const fetchTopics = async (req, res) => {
  try {
    const data = await TopicService.getTopicsWithSubtopics();
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
