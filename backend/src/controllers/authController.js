import * as AuthService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const user = await AuthService.register(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await AuthService.login(req.body);
    res.json(token);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
