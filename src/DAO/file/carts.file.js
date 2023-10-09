import fs from 'fs';

export default class CartsFile {

  constructor(filename = 'carts.json') {
    this.filename = filename;
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getCarts(query = {}) {
    //basico
    return await this.get();
  }

  async getCartByID(cid) {
    const db = await this.get();
    return db.find(cart => cart.id === cid);
  }

  async createNewCart() {
    const db = await this.get();
    const newCart = { id: new Date().toISOString(), products: [] };
    db.push(newCart);
    await fs.promises.writeFile(this.filename, JSON.stringify(db));
    return newCart;
  }

  async updateCart(cid, updatedCart) {
    const db = await this.get();
    const cartIndex = db.findIndex(cart => cart.id === cid);
    if (cartIndex !== -1) {
      db[cartIndex] = updatedCart;
      await fs.promises.writeFile(this.filename, JSON.stringify(db));
      return updatedCart;
    }
    return null;
  }

  get = async () => {
    return fs.promises.readFile(this.filename, {encoding: 'utf-8'})
      .then(r => JSON.parse(r));
  }
}
