import CartDTO from "../DTO/carts.dto.js";
import mongoose from "mongoose";
import { v4 } from "uuid";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import {
  generateCartErrorInfo,
  generateProductsErrorInfo,
  generateTicketErrorInfo,
} from "../errors/info.js";
import moment from "moment";

export default class CartRepository {
  constructor(cartDAO, userDAO, productDAO, ticketDAO) {
    this.cartDAO = cartDAO;
    this.userDAO = userDAO;
    this.productDAO = productDAO;
    this.ticketDAO = ticketDAO;
  }
  async createCart() {
    try {
      const cart = await this.cartDAO.createCart();
      return new CartDTO(cart);
    } catch (error) {
      throw error;
    }
  }
  async getCartById(id) {
    try {
      const cart = await this.cartDAO.getCartById(id);
      return new CartDTO(cart);
    } catch (error) {
      throw error;
    }
  }
  async updateCartById(id, data) {
    try {
      const cart = await this.cartDAO.updateCartById(id, data);
      return new CartDTO(cart);
    } catch (error) {
      throw error;
    }
  }
  async deleteCartById(id) {
    try {
      const cart = await this.cartDAO.deleteCartById(id);
      return new CartDTO(cart);
    } catch (error) {
      throw error;
    }
  }
  async addProductCartByID(pid, quantity, user) {
    try {
      if (user.rol === "admin") throw new Error("No authorized");
      const cartId = user.cartId[0]._id;
      let cart = await this.cartDAO.getCartById(cartId);
      const product = await this.productDAO.getProductById(pid);
      if (!cart) {
        cart = await this.cartDAO.createCart();
        user.cartId[0].push(cart._id);
        await user.save();
      }
      if (!product) {
        CustomError.createError({
          name: "Error",
          message: "Product not exists",
          code: EErrors.PRODUCT_NOT_EXISTS,
          info: generateProductsErrorInfo(product),
        });
      }
      const productValidate = cart.products.find(
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
        product.stock -= quantity;
        productValidate.quantity += quantity;
      } else {
        if (product.stock >= quantity) {
          product.stock -= quantity;
          cart.products.push({ pid, quantity });
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
  async deleteProductCartById(cid, pid) {
    try {
      const cartId = cid.toString();
      let cart = await this.cartDAO.getCartById(cartId);
      if (cart) {
        const productValidate = cart.products.find(
          (product) => product.pid.toString() == pid.toString()
        );
        if (productValidate) {
          await this.cartDao.updateCartById(
            { _id: cid },
            { $pull: { products: { pid: pid } } }
          );
          await cart.save();
          return cart;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async clearCart(cid) {
    try {
      const cart = await this.cartDAO.getCartById(cid);
      const productsCart = { products: [] };
      await this.cartDAO.updateCartById(cid, productsCart);
    } catch (error) {
      throw error;
    }
  }
  async deleteProductOneCartById(cid, pid) {
    let cart = await this.cartDAO.getCartById(cid);
    const product = await this.productDAO.getProductById(pid);
    if (cart) {
      const productValidate = cart.products.find(
        (product) => product.pid._id == pid
      );
      if (productValidate) {
        productValidate.quantity -= 1;
        product.stock += 1;
        if (productValidate.quantity == 0) {
          this.clearCart(cid);
        }
        await this.cartDAO.updateCartById(cid, cart);
        await this.productDAO.updateProduct(pid, product);
        return cart;
      }
      return null;
    } else {
      return null;
    }
  }
  async deleteProductsCart(cid) {
    try {
      const cart = await this.cartDAO.getCartById(cid);
      if (!cart) return null;
      await this.cartDAO.updateCartById(id, { product: [] });
      await cart.save();
    } catch (error) {
      throw error;
    }
  }
  async updateProductCartById(cid, pid, quantity) {
    try {
      let cart = await this.cartDAO.getCartById(cid);
      const product = cart.products.find((product) => {
        product.pid._id.toString() == pid.toString();
      });
      if (!product) {
        cart.products.push({ pid, quantity });
      }
      product.quantity = quantity;
      await this.cartDAO.updateCartById(cid, cart);
      return new cart();
    } catch (error) {
      throw error;
    }
  }

  async getCartUserById(user) {
    try {
      const userBD = await this.userDAO.getUserByEmail(user.email);
      let cart = userBD.cartId[0];
      if (!cart) {
        CustomError.createError({
          name: "Error",
          message: "Cart not exists",
          code: EErrors.CART_NOT_EXISTS,
          info: generateCartErrorInfo(cart),
        });
      }
      const cartID = new mongoose.Types.ObjectId(cart);
      cart = await this.cartDAO.getCartById(cartID);
      let total = 0;
      cart.products.forEach((product) => {
        const subtotal = product.pid.price * product.quantity;
        product.total = subtotal;
        total = total + subtotal;
      });
      return { cart, total };
    } catch (error) {
      throw error;
    }
  }

  async getTicketCartUserById(user) {
    const { cart, total } = await this.getCartUserById(user);
    if (cart.products.length !== 0) {
      const products = { products: [] };
      await this.cartDAO.updateCartById(cart._id, products);
      const ticket = {
        code: v4(),
        purchase_datetime: new moment()
          .format("YYYY-MM-DD HH:mm:ss")
          .toString(),
        amount: total,
        purcharser: user.email,
      };
      await this.ticketDAO.addTicket(ticket);
      return ticket;
    } else {
      CustomError.createError({
        name: "Error",
        message: "Cart not products",
        code: EErrors.NOT_PRODUCTS_TICKET,
        info: generateTicketErrorInfo(),
      });
    }
  }
}
