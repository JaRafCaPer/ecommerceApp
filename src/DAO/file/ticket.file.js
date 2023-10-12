import FileManager from './file.manager.js';

export default class TicketsFile extends FileManager {
  constructor(filename = 'tickets.json') {
    super(filename);
  }

  async createTicket(ticket) {
    const tickets = await this.get();
    const newTicket = { ...ticket, _id: new Date().toISOString() };
    tickets.push(newTicket);
    await this.writeData(tickets);
    return newTicket;
  }

  async getTickets() {
    return this.get();
  }

  async getTicketById(id) {
    const tickets = await this.get();
    return tickets.find((ticket) => ticket._id === id);
  }

  async updateTicket(id, data) {
    const tickets = await this.get();
    const ticketIndex = tickets.findIndex((ticket) => ticket._id === id);
    if (ticketIndex !== -1) {
      tickets[ticketIndex] = { ...tickets[ticketIndex], ...data };
      await this.writeData(tickets);
      return tickets[ticketIndex];
    }
    return null;
  }

  async deleteTicket(id) {
    const tickets = await this.get();
    const ticketIndex = tickets.findIndex((ticket) => ticket._id === id);
    if (ticketIndex !== -1) {
      const deletedTicket = tickets.splice(ticketIndex, 1)[0];
      await this.writeData(tickets);
      return deletedTicket;
    }
    return null;
  }
}
