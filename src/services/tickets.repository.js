import TicketDTO from "../DAO/DTO/tickets.dto.js";

export default class TicketRepository {

    constructor(dao) {
        this.dao = dao
    }

    getTickets = async () => { return await this.dao.getTickets() }
    getTicketById = async(oid) => { return await this.dao.getTicketById(oid) }
    createTicket = async(store) => { 
        const ticketToInsert = new TicketDTO(cart)
        return await this.dao.createTicket(ticketToInsert)
    }
    resolveTicket = async (oid, resolve) => {
        const ticket = this.getTicketById(oid)
        ticket.status = resolve
        
        return await this.dao.updateTicket(oid, ticket)
    }
}