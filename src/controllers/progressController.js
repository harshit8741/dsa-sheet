import * as ProgressService from "../services/progressService.js";

export const updateProgress = async (req, res) => {
  try {
    const progress = await ProgressService.updateProgress(req.body);
    res.json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const progress = await ProgressService.getUserProgress(req.params.userId);
    res.json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
