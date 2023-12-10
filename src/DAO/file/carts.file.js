import FileManager from './file.manager.js';
import { v4 as uuidv4 } from 'uuid';

export default class CartsFile extends FileManager {
  constructor(filename = 'carts.json') {
    super(filename);
  }

  async createCart() {
    try {
      const newCart = { products: [], total: 0, _id: uuidv4() };
      const carts = await this.get();
      carts.push(newCart);
      await this.writeData(carts);
      return newCart;
    } catch (error) {
      
      console.error('Error creating cart:', error);
      return null;
    }
  }

  async deleteProductCartById(cartId, productId) {
    try {
      const carts = await this.get();
      const cartIndex = carts.findIndex((cart) => cart._id === cartId);

      if (cartIndex !== -1) {
        carts[cartIndex].products = carts[cartIndex].products.filter(
          (product) => product.pid !== productId
        );
        await this.writeData(carts);
        return carts[cartIndex];
      }

      return null;
    } catch (error) {
      
      console.error('Error deleting product from cart:', error);
      return null;
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.get();
      return carts.find((cart) => cart._id === cartId);
    } catch (error) {
      
      console.error('Error getting cart by ID:', error);
      return null;
    }
  }

  async updateCartById(id, cart) {
    try {
      const carts = await this.get();
      const cartIndex = carts.findIndex((c) => c._id === id);

      if (cartIndex !== -1) {
        carts[cartIndex] = cart;
        await this.writeData(carts);
        return cart;
      }

      return null;
    } catch (error) {
      
      console.error('Error updating cart by ID:', error);
      return null;
    }
  }

  async deleteCartById(id) {
    try {
      const carts = await this.get();
      const cartIndex = carts.findIndex((c) => c._id === id);

      if (cartIndex !== -1) {
        const deletedCart = carts.splice(cartIndex, 1)[0];
        await this.writeData(carts);
        return deletedCart;
      }

      return null;
    } catch (error) {
      
      console.error('Error deleting cart by ID:', error);
      return null;
    }
  }
}
