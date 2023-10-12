import CartDTO from "../DTO/cart.dto.js";
import TicketDTO from "../DTO/ticket.dto.js";
import { v4 as uuidv4 } from "uuid";

export default class CartService {
  constructor(cartDAO, productDAO, userDAO, ticketDAO) {
    this.cartDAO = cartDAO;
    this.productDAO = productDAO;
    this.userDAO = userDAO;
    this.ticketDAO = ticketDAO;
  }

  async createCart() {
    try {
      const cart = await this.cartDAO.createCart();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await this.cartDAO.getCartById(cartId);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateCartById(id, cart) {
    try {
      const cartUpdated = await this.cartDAO.updateCartById(id, cart);
      return cartUpdated;
    } catch (error) {
      throw error;
    }
  }

  async deleteCartById(id) {
    try {
      const cartDeleted = await this.cartDAO.deleteCartById(id);
      return new CartDTO(cartDeleted);
    } catch (error) {
      throw error;
    }
  }

  async addProductCartById(user, pid, quantity) {
    try {
      const cartId = user.cartId;
      let cart = await this.cartDAO.getCartById(cartId);

      if (!cart) {
        cart = await this.cartDAO.createCart();
        user.cartId = cart._id;
      }

      const product = await this.productDAO.getProductById(pid);
      const productExist = cart.products.find(
        (product) => product.pid._id.toString() === pid.toString()
      );

      if (productExist) {
        const availableStock = product.stock - productExist.quantity;
        if (quantity > 0 && availableStock > 0) {
          const quantityToAdd = Math.min(quantity, availableStock);
          productExist.quantity += quantityToAdd;
        } else {
          throw new Error(
            `Insufficient stock to add ${quantity} units of ${product.name}. Available stock: ${availableStock}`
          );
        }
      } else {
        if (quantity > 0 && product.stock > 0) {
          const quantityToAdd = Math.min(quantity, product.stock);
          cart.products.push({ pid, quantity: quantityToAdd });
          await this.cartDAO.updateCartById(cartId, cart);
        } else {
          throw new Error(
            `Insufficient stock to add ${quantity} units of ${product.name}. Available stock: ${product.stock}`
          );
        }
      }

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async decreaseProductCartById(cid, pid, quantity) {
    try {
      let cart = await this.cartDAO.getCartById(cid);
      if (cart) {
        const productExist = cart.products.find(
          (product) => product.pid._id.toString() == pid.toString()
        );
        if (productExist) {
          productExist.quantity -= quantity;
          return cart;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProductCartById(cid) {
    try {
      const cart = await this.cartDAO.getCartById(cid);
      if (cart) {
        await this.cartDAO.updateCartById(cid, { products: [] });
      }
    } catch (error) {
      throw error;
    }
  }

  async getCartUserById(user) {
    try {
      // const user = await this.userDAO.getUserByEmail(user.email);
      console.log("user cart service", user);
      let cartId = user.cartId;
      const cart = await this.cartDAO.getCartById(cartId);
      let totalCompra = 0;
      cart.products.forEach((product) => {
        totalCompra += product.pid.price * product.quantity;
      });
      return { cart, totalCompra };
    } catch (error) {
      throw error;
    }
  }
  async createAndSaveTicket(user) {
    try {
      const uniqueTicketCode = uuidv4();
      const purchaseDatetime = new Date();
      let total = 0;
      const cart = await this.getCartById(user.cartId);
      cart.products.forEach((product) => {
        total += product.pid.price * product.quantity;
      });

      const ticket = {
        code: uniqueTicketCode,
        purchase_datetime: purchaseDatetime,
        amount: total,
        purchaser: user.email,
      };
      const ticketDTO = new TicketDTO(ticket);
      const savedTicket = await this.ticketDAO.createTicket(ticketDTO);
      return savedTicket;
    } catch (error) {
      throw error;
    }
  }
}
