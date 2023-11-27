import MessageDTO from '../DTO/message.dto.js';
import CustomError from '../errors/CustomError.js';
import EErrors from '../errors/enums.js';
import { generateMessageErrorInfo } from '../errors/info.js';

export default class MessageService {
    constructor(messageDAO) {
        this.messageDAO = messageDAO;
    }
    async saveMessage(message) {
        try{
            const messageSaved = await this.messageDAO.createMessage(message);
            return new MessageDTO(messageSaved);
        }catch(error){
            CustomError.createError({
                name: 'Error',
                message: 'Message not saved',
                code: EErrors.MESSAGE_NOT_SAVED,
                info: generateMessageErrorInfo(message),
            });
        }
    }
    async getMessages(){
        try{
            const messages = await this.messageDAO.getMessages();
            return messages;
        }catch(error){
           CustomError.createError({
                name: 'Error',
                message: 'Messages not found',
                code: EErrors.MESSAGES_NOT_FOUND,
                info: generateMessageErrorInfo(messages),
            });
        }
    }
}

