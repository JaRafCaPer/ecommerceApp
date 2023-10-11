import ChatModel from "./models/messages.mongo.model.js";

export default class ChatsMongo {
  async saveMessage(data) {
    try {
      return await ChatModel.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getMessages() {
    try {
      return await ChatModel.find().lean().exec();
    } catch (error) {
      throw error;
    }
  }
}
