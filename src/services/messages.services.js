export default class MessageService {
  constructor(dao) {
    this.dao = dao;
  }

  async retrieveMessages() {
    try {
      return await this.dao.retrieveMessages();
    } catch (error) {
      console.error('Error al obtener los mensajes:', error);
      throw new Error('Error interno del servidor');
    }
  }

  async saveMessage(data) {
    const { email, message } = data;

    if (!email || !message) {
      throw new Error('Faltan datos');
    }

    try {
      return await this.dao.createMessage(data);
    } catch (error) {
      console.error('Error al guardar el mensaje:', error);
      throw new Error('Error interno del servidor');
    }
  }
}