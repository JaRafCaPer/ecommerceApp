import ticketModel from "./models/ticket.mongo.model.js";

export default class TicketsMongo {
    async addTicket(data) {
        try {
            return await ticketModel.create(data);
        } catch (error) {
            throw error;
        }
    }
    async getTickets() {
        try {
            return await ticketModel.find().lean().exec();
        } catch (error) {
            throw error;
        }
    }
    async getTicketById(id) {
        try {
            return await ticketModel.findById(id).lean().exec();
        } catch (error) {
            throw error;
        }
    }
    async updateTicket(id, data) {
        try {
            const ticket = await ticketModel.findById(id);
            if (!ticket) null;
            ticketModel.updateOne({ _id: id }, data);
        } catch (e) {
            throw e;
        }
    }
}