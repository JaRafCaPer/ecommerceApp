import ChatModel from "./models/message.mongo.models.js";

export default class MessagesMongo {
    async createMessage(message) {
        try {
            return await ChatModel.create(message);
        } catch (error) {
            throw error;
        }
    }
    async getMessages(){
        try{
            return await ChatModel.find().lean().exec();
        }catch(error){
            throw error;
        }
    }
}