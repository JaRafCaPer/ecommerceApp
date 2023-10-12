import { messageService } from "../services/index.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await messageService.getMessages();
    res.status(200).render("chat", { messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveMessage = async (req, res) => {
  try {
    const message = req.body;
    const messageSaved = await messageService.saveMessage(message);
    res.status(201).json(messageSaved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
