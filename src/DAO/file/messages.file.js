import FileManager from './file.manager.js';

export default class MessagesFile extends FileManager {
  constructor(filename = 'messages.json') {
    super(filename);
  }

  async createMessage(message) {
    const messages = await this.get();
    const newMessage = { ...message, _id: new Date().toISOString() };
    messages.push(newMessage);
    await this.writeData(messages);
    return newMessage;
  }

  async getMessages() {
    return this.get();
  }
}
