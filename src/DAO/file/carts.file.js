import FileManager from './file.manager.js';
import { v4 as uuidv4 } from 'uuid';

export default class CartsFile extends FileManager {
  constructor(filename = 'carts.json') {
    super(filename);
  }

  async createCart() {
    const newCart = { products: [], total: 0, _id: uuidv4() };
    const carts = await this.get();
    carts.push(newCart);
    await this.writeData(carts);
    return newCart;
  }

  async getCartById(cartId) {
    const carts = await this.get();
    return carts.find((cart) => cart.id === cartId);
  }

  async updateCartById(id, cart) {
    const carts = await this.get();
    const cartIndex = carts.findIndex((c) => c.id === id);
    if (cartIndex !== -1) {
      carts[cartIndex] = cart;
      await this.writeData(carts);
      return cart;
    }
    return null;
  }

  async deleteCartById(id) {
    const carts = await this.get();
    const cartIndex = carts.findIndex((c) => c.id === id);
    if (cartIndex !== -1) {
      const deletedCart = carts.splice(cartIndex, 1)[0];
      await this.writeData(carts);
      return deletedCart;
    }
    return null;
  }
}
