import { messageService } from '../services/index.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await messageService.retrieveMessages();
    res.render('chat', { messages });
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const addMessage = async (data, socket = null, res = null) => {
  try {
    const savedMessage = await messageService.saveMessage(data);

    if (socket) {
      socket.emit('nuevo_mensaje', savedMessage);
    }
    if (res) {
      res.status(200).send('Mensaje agregado');
    }
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    if (socket) {
      socket.emit('error', 'Error interno del servidor');
    }
    if (res) {
      res.status(500).send('Error interno del servidor');
    }
  }
};
