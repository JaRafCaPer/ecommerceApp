import { messageService } from "../services/index.js";

export const getMessages = async (req, res) => {
  try {
    
    let user = {}
    if (req.user.user) {
      user = req.user.user;
    } else {
      user = req.user;
    }
    const messages = await messageService.getMessages();
    res.status(200).render("chat", { messages, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const saveMessage = async (req, res) => {
  try {
    const message = req.body;
    const messages = await messageService.saveMessage(message);
    res.status(201).redirect("/api/chat", { messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
