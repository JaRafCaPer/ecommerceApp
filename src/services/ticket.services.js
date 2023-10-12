import TicketDTO from "../DTO/ticket.dto.js";

export default class TicketService{
    constructor(ticketDAO){
        this.ticketDAO = ticketDAO;
    }
    async createTicket(ticket){
        try{
            const ticketAdded = await this.ticketDAO.createTicket(ticket);
            return ticketAdded;
        }catch(error){
            throw error;
        }
    }

    async getTicket(){
        try{
            const tickets = await this.ticketDAO.getTickets();
            return tickets;
        }catch(error){
            throw error;
        }
    }
}