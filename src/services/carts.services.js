import CartDTO from "../DTO/cart.dto.js";
import TicketDTO from "../DTO/ticket.dto.js";
import { v4 as uuidv4 } from "uuid";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import {
  generateCartErrorInfo,
  generateProductsErrorInfo,
  generateTicketErrorInfo,
} from "../errors/info.js";

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
      CustomError.createError({
        name: "Error",
        message: "Cart not created",
        code: EErrors.CART_NOT_CREATED,
        info: generateCartErrorInfo(cart),
      });
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await this.cartDAO.getCartById(cartId);
      return cart;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Cart not exists",
        code: EErrors.CART_NOT_FOUND,
        info: generateCartErrorInfo(cart),
      });
    }
  }

  async updateCartById(id, cart) {
    try {
      const cartUpdated = await this.cartDAO.updateCartById(id, cart);
      return cartUpdated;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Cart not updated",
        code: EErrors.CART_NOT_UPDATED,
        info: generateCartErrorInfo(cart),
      });
    }
  }

  async deleteCartById(id) {
    try {
      const cartDeleted = await this.cartDAO.deleteCartById(id);
      return new CartDTO(cartDeleted);
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Cart not deleted",
        code: EErrors.CART_NOT_DELETED,
        info: generateCartErrorInfo(cart),
      });
    }
  }

  async addProductCartById(user, pid, quantity) {
    try {
    
      if (user.rol === "admin") throw new Error("No authorized");
      let cartId = user.cartId;
      let cart;
      if (cartId) {
        cart = await this.cartDAO.getCartById(cartId);
      } else {
        cart = await this.cartDAO.createCart();
        user.cartId.push(cart._id);
        await this.userDAO.updateUser(user._id, user);
        cartId = cart._id;
      }
      const product = await this.productDAO.getProductById(pid);
      if (user.rol === "premium" && product.owner === user.email) {
        CustomError.createError({
          name: "Error",
          message: "You can't buy your own products",
          code: EErrors.NOT_BUY_OWN_PRODUCTS,
          info: generateProductsErrorInfo(product),
        });
      }
      if (!product) {
        CustomError.createError({
          name: "Error",
          message: "Product not exists",
          code: EErrors.PRODUCT_NOT_EXISTS,
          info: generateProductsErrorInfo(product),
        });
      }
      const productValidate = cart.products?.find(
        (product) => product.pid._id.toString() == pid.toString()
      );
      if (productValidate) {
        if (product.stock < quantity) {
          CustomError.createError({
            name: "Error",
            message: "Stock not available",
            code: EErrors.STOCK_NOT_AVAILABLE,
            info: generateProductsErrorInfo(product),
          });
        }
        productValidate.quantity += quantity;
      } else {
        if (product.stock >= quantity) {
          product.stock -= quantity;
          cart.products.push({ pid, quantity });
          await this.cartDAO.updateCartById(cartId, cart);
        } else {
          CustomError.createError({
            name: "Error",
            message: "Stock not available",
            code: EErrors.STOCK_NOT_AVAILABLE,
            info: generateProductsErrorInfo(product),
          });
        }
      }
      await this.cartDAO.updateCartById(cartId, cart);
      await this.productDAO.updateProduct(pid, product);
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
      CustomError.createError({
        name: "Error",
        message: "Product not decreased from cart",
        code: EErrors.CART_NOT_FOUND,
        info: generateCartErrorInfo(cart),
      });
    }
  }

  async deleteProductCartById(cid) {
    try {
      const cart = await this.cartDAO.getCartById(cid);
      if (cart) {
        await this.cartDAO.updateCartById(cid, { products: [] });
      }
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not deleted from cart",
        code: EErrors.CART_NOT_FOUND,
        info: generateCartErrorInfo(cart),
      });
    }
  }

  async getCartUserById(user) {
    try {
      // const user = await this.userDAO.getUserByEmail(user.email);
     
      let cartId = user.cartId;
      const cart = await this.cartDAO.getCartById(cartId);
      let totalCompra = 0;
      cart.products.forEach((product) => {
        totalCompra += product.pid.price * product.quantity;
      });
      let subTotal = 0;
      cart.products.forEach((product) => {
        product.subTotal = product.pid.price * product.quantity;
      });
   
      return { cart, totalCompra };
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Cart not exists",
        code: EErrors.CART_NOT_FOUND,
        info: generateCartErrorInfo(cart),
      });
    }
  }
  async createAndSaveTicket(user) {
    try {
      const uniqueTicketCode = uuidv4();
      const purchaseDatetime = new Date();
      let total = 0;
      const cart = await this.getCartById(user.cartId);
      if (!cart) {
        CustomError.createError({
          name: "Error",
          message: "Cart not exists",
          code: EErrors.CART_NOT_FOUND,
          info: generateCartErrorInfo(cart),
        });
      } else {
        cart.products.forEach((product) => {
          total += product.pid.price * product.quantity;
        });
        const products = cart.products.map((product) => {
          return {
            pid: product.pid._id,
            title: product.pid.title,
            code: product.pid.code,
            quantity: product.quantity,
          };
        });

        const ticket = {
          code: uniqueTicketCode,
          purchase_datetime: purchaseDatetime,
          products: products,
          amount: total,
          purchaser: user.email,
        };
        const ticketDTO = new TicketDTO(ticket);
        const savedTicket = await this.ticketDAO.createTicket(ticketDTO);
        if (!savedTicket) {
          CustomError.createError({
            name: "Error",
            message: "Ticket not saved",
            code: EErrors.NOT_PRODUCTS_TICKET,
            info: generateTicketErrorInfo(savedTicket),
          });
        }
        return savedTicket;
      }
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Ticket not created",
        code: EErrors.NOT_PRODUCTS_TICKET,
        info: generateTicketErrorInfo(savedTicket),
      });
    }
  }
}
