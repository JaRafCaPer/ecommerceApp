import CustomError from "../../errors/CustomError.js";
import cartModel from "./models/carts.mongo.models.js";
import { generateCartErrorInfo } from "../../errors/info.js";
import EErrors from "../../errors/enums.js";


export default class CartsMongo {
  async createCart() {
    try {
      const cart = await cartModel.create();
      console.log("cart mongo create", cart);
      return cart
    } catch (error) {
      CustomError.createError({
        message: "Error creating cart",
        code:EErrors.CART_NOT_CREATED,
        info: generateCartErrorInfo(cart),
      });
    }
  }

  async getCartById(cartId) {
    try {
      
      const newCartId = cartId;
      const newCart = await cartModel
      .findById(newCartId)
      .populate("products.pid")
      .lean()
      .exec();
      console.log("cart mongo get", newCart);
       return newCart
    } catch (error) {
      CustomError.createError({
        message: "Error getting cart",
        code:EErrors.CART_NOT_FOUND,
        info: generateCartErrorInfo(cart),
      });
    }
  }

  async updateCartById(id, cart) {
    try {
      return await cartModel.findByIdAndUpdate(id, cart);
    } catch (error) {
      CustomError.createError({
        message: "Error updating cart",
        code:EErrors.CART_NOT_UPDATED,
        info: generateCartErrorInfo(cart),
      });
    }
  }

  async deleteCartById(id) {
    try {
      return await cartModel.findByIdAndDelete(id);
    } catch (error) {
      CustomError.createError({   
        message: "Error deleting cart",
        code:EErrors.CART_NOT_DELETED,
        info: generateCartErrorInfo(cart),
      });
    }
  }
}
