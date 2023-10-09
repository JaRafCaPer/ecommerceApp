import TicketModel from "./models/tickets.mongo.model.js"

export default class Ticket {
    async find() {
      return await TicketModel.find();
    }
  
    async findOne(query) {
      return await TicketModel.findOne(query);
    }
  
    async create(ticket) {
      return await TicketModel.create(ticket);
    }
  
    async updateOne(query, ticket) {
      return await TicketModel.updateOne(query, { $set: ticket });
    }
  }
  