export default class MessageDTO {
    constructor(user, message, createdAt) {
      this.user = user;
      this.message = message;
      this.createdAt = createdAt;
    }
  
    static fromModel(messageModel) {
      return new MessageDTO(
        messageModel.user,
        messageModel.message,
        messageModel.createdAt
      );
    }
  }
  