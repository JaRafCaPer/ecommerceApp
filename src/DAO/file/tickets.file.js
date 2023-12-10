import FileManager from './file.manager.js';
import { v4 as uuidv4 } from 'uuid';

export default class TicketsFile extends FileManager {
  constructor(filename = 'tickets.json') {
    super(filename);
  }

  async createTicket(ticket) {
    try {
      const tickets = await this.get();
      ticket._id = uuidv4();
      tickets.push(ticket);
      await this.writeData(tickets);
      return ticket;
    } catch (error) {
      
      console.error('Error creating ticket:', error);
      return null;
    }
  }

  async getTicketByUser(mail) {
    try {
      const tickets = await this.get();
      return tickets.filter((ticket) => ticket.purchaser === mail);
    } catch (error) {
      
      console.error('Error getting tickets by user:', error);
      return null;
    }
  }

  async getTickets() {
    try {
      return await this.get();
    } catch (error) {
      
      console.error('Error getting tickets:', error);
      return null;
    }
  }

  async getTicketById(id) {
    try {
      const tickets = await this.get();
      return tickets.find((ticket) => ticket._id === id);
    } catch (error) {
      
      console.error('Error getting ticket by ID:', error);
      return null;
    }
  }

  async updateTicketById(id, data) {
    try {
      const tickets = await this.get();
      const ticketIndex = tickets.findIndex((ticket) => ticket._id === id);

      if (ticketIndex !== -1) {
        tickets[ticketIndex] = { ...tickets[ticketIndex], ...data };
        await this.writeData(tickets);
        return tickets[ticketIndex];
      }

      return null;
    } catch (error) {
      
      console.error('Error updating ticket by ID:', error);
      return null;
    }
  }

  async deleteTicket(id) {
    try {
      const tickets = await this.get();
      const ticketIndex = tickets.findIndex((ticket) => ticket._id === id);

      if (ticketIndex !== -1) {
        const deletedTicket = tickets.splice(ticketIndex, 1)[0];
        await this.writeData(tickets);
        return deletedTicket;
      }

      return null;
    } catch (error) {
      
      console.error('Error deleting ticket by ID:', error);
      return null;
    }
  }
}
