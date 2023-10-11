import { messageRepository } from "../services/index.js";

export const getMessages = async (req, res) => {
  try {
    console.log(req.user.user);
    if (req.user.user.rol === "user") {
      const messages = await messageRepository.getMessages();
      res.status(200).render("chat", { messages });
    } else {
      throw new Error("No authorized");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const saveMessage = async (req, res) => {
  try {
    const message = await messageRepository.saveMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
