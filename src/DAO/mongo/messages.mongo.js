import MessagesModel from './models/message.mongo.model.js';

export default class MessagesMongo {
  async retrieveMessages() {
    return await MessagesModel.find().lean();
  }

  async createMessage(data) {
    return await MessagesModel.create(data);
  }
}
