import FileManager from './file.manager.js';
import { v4 as uuidv4 } from 'uuid';

export default class MessagesFile extends FileManager {
  constructor(filename = 'messages.json') {
    super(filename);
  }

  async createMessage(message) {
    try {
      const messages = await this.get();
      message._id = uuidv4();
      messages.push(message);
      await this.writeData(messages);
      return message;
    } catch (error) {
      
      console.error('Error creating message:', error);
      return null;
    }
  }

  async getMessages() {
    try {
      return await this.get();
    } catch (error) {
      
      console.error('Error getting messages:', error);
      return null;
    }
  }
}
