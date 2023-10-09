import fs from 'fs';

export default class MessagesFile {

  constructor(filename = 'messages.json') {
    this.filename = filename;
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async retrieveMessages() {
    return await this.get();
  }

  async createMessage(data) {
    const db = await this.get();
    db.push(data);
    return fs.promises.writeFile(this.filename, JSON.stringify(db));
  }

  get = async () => {
    return fs.promises.readFile(this.filename, {encoding: 'utf-8'})
      .then(r => JSON.parse(r));
  }
}
