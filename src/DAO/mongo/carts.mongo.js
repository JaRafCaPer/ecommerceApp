import cartModel from "./models/carts.mongo.models.js";

export default class CartsMongo {
  async createCart() {
    try {
      const cart = await cartModel.create();
      console.log("cart mongo create", cart);
      return cart
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      console.log("cartId cart mongo", cartId);
      const newCartId = cartId;
      return await cartModel
        .findById(newCartId)
        .populate("products.pid")
        .lean()
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async updateCartById(id, cart) {
    try {
      return await cartModel.findByIdAndUpdate(id, cart);
    } catch (error) {
      throw error;
    }
  }

  async deleteCartById(id) {
    try {
      return await cartModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
