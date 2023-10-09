import fs from 'fs';

export default class TicketsFile {
  constructor(filename = 'tickets.json') {
    this.filename = filename;
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async find() {
    return await this.get();
  }

  async findOne(query) {
    const db = await this.get();
    return db.find(ticket => ticket._id === query._id);
  }

  async create(ticket) {
    const db = await this.get();
    db.push(ticket);
    await fs.promises.writeFile(this.filename, JSON.stringify(db));
    return ticket;
  }

  async updateOne(query, updatedTicket) {
    const db = await this.get();
    const ticketIndex = db.findIndex(ticket => ticket._id === query._id);
    if (ticketIndex !== -1) {
      db[ticketIndex] = { ...db[ticketIndex], ...updatedTicket };
      await fs.promises.writeFile(this.filename, JSON.stringify(db));
      return db[ticketIndex];
    }
    return null;
  }

  async get() {
    const content = await fs.promises.readFile(this.filename, { encoding: 'utf-8' });
    return JSON.parse(content);
  }
}
