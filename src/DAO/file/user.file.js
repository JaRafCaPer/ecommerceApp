import fs from 'fs';

export default class UserFile {

  constructor(filename = 'users.json') {
    this.filename = filename;
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async createUser(user) {
    const db = await this.get();
    db.push(user);
    return fs.promises.writeFile(this.filename, JSON.stringify(db));
  }

  async getUserByEmail(email) {
    const db = await this.get();
    return db.find(user => user.email === email);
  }

  async getUserById(id) {
    const db = await this.get();
    return db.find(user => user.id === id);
  }

  async deleteUser(id) {
    const db = await this.get();
    const newDb = db.filter(user => user.id !== id);
    return fs.promises.writeFile(this.filename, JSON.stringify(newDb));
  }

  get = async () => {
    return fs.promises.readFile(this.filename, {encoding: 'utf-8'})
      .then(r => JSON.parse(r));
  }
}
