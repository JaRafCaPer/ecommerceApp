export default class MessageDTO {
  constructor(message) {
    if (!message.user) {
      throw new Error("User is required");
    }
    if (!message.message) {
      throw new Error("Message is required");
    }
    this.user = message.user;
    this.message = message.message;
    this.hour = message.hour;
  }
}
