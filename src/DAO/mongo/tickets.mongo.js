import CustomError from "../../errors/CustomError.js";
import ticketModel from "./models/tickets.mongo.models.js";
import EErrors from "../../errors/enums.js";
import { generateTicketErrorInfo } from "../../errors/info.js";

export default class TicketsMongo {
  async createTicket(ticket) {
    try {
      
      return await ticketModel.create(ticket);
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Ticket not saved",
        code: EErrors.TICKET_NOT_SAVED,
        info: generateTicketErrorInfo(ticket),
      });
  }
}
  async getTicketByUser(mail) {
    try {
      console.log("mail in mongo", mail);
      const userMail = {purchaser: mail}
      const tickets = await ticketModel.find(userMail).lean().exec();
      console.log("tickets in mongo", tickets);
      return tickets;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Ticket not found",
        code: EErrors.TICKET_NOT_FOUND,
        info: generateTicketErrorInfo(ticket),
      });
    }
  }


  async getTickets() {
    try {
      return await ticketModel.find().lean().exec();
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Tickets not found",
        code: EErrors.TICKETS_NOT_FOUND,
        info: generateTicketErrorInfo(ticket),
      });
    }
  }
  async getTicketById(id) {
    try {
      return await ticketModel.findById(id).lean().exec();
    } catch (error) {
       CustomError.createError({
        name: "Error",
        message: "Ticket not found",
        code: EErrors.TICKET_NOT_FOUND,
        info: generateTicketErrorInfo(ticket),
       });
    }
  }
  async updateTicket(id, data) {
    try {
        const ticket = await ticketModel.findById(id);
        if (!ticket) null;
        ticketModel.updateOne({ _id: id }, data);
    } catch (e) {
        CustomError.createError({
            name: "Error",
            message: "Ticket not updated",
            code: EErrors.TICKET_NOT_UPDATED,
            info: generateTicketErrorInfo(ticket),
        });
    }
}
  async deleteTicket(id) {
    try {
      return await ticketModel.findByIdAndDelete(id);
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Ticket not deleted",
        code: EErrors.TICKET_NOT_DELETED,
        info: generateTicketErrorInfo(ticket),
      });
    }
  }
}
