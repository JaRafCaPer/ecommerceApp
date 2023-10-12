import MessageDTO from '../DTO/message.dto.js';

export default class MessageService {
    constructor(messageDAO) {
        this.messageDAO = messageDAO;
    }
    async saveMessage(message) {
        try{
            const messageSaved = await this.messageDAO.saveMessage(message);
            return new MessageDTO(messageSaved);
        }catch(error){
            throw error;
        }
    }
    async getMessages(){
        try{
            const messages = await this.messageDAO.getMessages();
            return messages;
        }catch(error){
            throw error;
        }
    }
}

