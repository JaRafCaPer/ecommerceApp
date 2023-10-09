export default class MessageDTO {
    constructor(message) {
        //manera con el if 
      if (!message?.email) {
        throw new Error("El email es requerido.");
      }
      if (!message?.message) {
        throw new Error("El mensaje es requerido.");
      }
  
      this.email = message.email;
      this.message = message.message;
    }
  }
  