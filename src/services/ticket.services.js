import TicketDTO from "../DTO/ticket.dto.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateTicketErrorInfo } from "../errors/info.js";

export default class TicketService{
    constructor(ticketDAO){
        this.ticketDAO = ticketDAO;
    }
    async createTicket(ticket){
        try{
            const ticketAdded = await this.ticketDAO.createTicket(ticket);
            return ticketAdded;
        }catch(error){
            CustomError.createError({   
                name: 'Error',
                message: 'Ticket not added',
                code: EErrors.TICKET_NOT_ADDED,
                info: generateTicketErrorInfo(ticket),
            });
        }
    }

    async getTicket(){
        try{
            const tickets = await this.ticketDAO.getTickets();
            return tickets;
        }catch(error){
           CustomError.createError({
                name: 'Error',
                message: 'Tickets not found',
                code: EErrors.TICKETS_NOT_FOUND,
                info: generateTicketErrorInfo(tickets),
            });
        }
    }

    async getTicketById(id){
        try{
            const ticket = await this.ticketDAO.getTicketById(id);
            return ticket;
        }catch(error){
            CustomError.createError({
                name: 'Error',
                message: 'Ticket not found',
                code: EErrors.TICKET_NOT_FOUND,
                info: generateTicketErrorInfo(id),
            });
        }
    }

    async updateTicketById(id, ticket){
        try{
            const ticketUpdated = await this.ticketDAO.updateTicketById(id, ticket);
            console.log("service:",ticketUpdated);
            return ticketUpdated;
        }catch(error){
            CustomError.createError({
                name: 'Error',
                message: 'Ticket not updated',
                code: EErrors.TICKET_NOT_UPDATED,
                info: generateTicketErrorInfo(ticket),
            });
        }
    }
}