import ChatModel from "./models/message.mongo.models.js";
import CustomError from "../../errors/CustomError.js";
import EErrors from "../../errors/enums.js";
import { generateMessageErrorInfo } from "../../errors/info.js";

export default class MessagesMongo {
    async createMessage(message) {
        try {
            return await ChatModel.create(message);
        } catch (error) {
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
            return await ChatModel.find().lean().exec();
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