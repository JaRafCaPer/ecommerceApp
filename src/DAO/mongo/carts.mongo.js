import CartModel from "./models/carts.mongo.model.js";

export default class Cart {
  getCarts = async () => {
    return await CartModel.find();
  };

  getCartById = async (cartId) => {
    return await CartModel.findById(cartId).populate('products.item').lean().exec();
  };

  createCart = async () => {
    return await CartModel.create({ products: [] });
  };

  addProductsToCart = async (cartId, productsToAdd) => {
    const cart = await CartModel.findById(cartId);

    for (const productToAdd of productsToAdd) {
      const existingProductIndex = cart.products.findIndex(
        (item) => item.item.toString() === productToAdd.item
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += productToAdd.quantity;
      } else {
        cart.products.push({ item: productToAdd.item, quantity: productToAdd.quantity });
      }
    }

    const updatedCart = await cart.save();
    return updatedCart;
  };

  updateProductQuantityInCart = async (cartId, productId, newQuantity) => {
    const cart = await CartModel.findById(cartId);
    const productIndex = cart.products.findIndex((item) => item.item.toString() === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = newQuantity;
      const updatedCart = await cart.save();
      return updatedCart;
    } else {
      throw new Error("Product not found in cart");
    }
  };

  deleteCart = async (cartId) => {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    cart.products = [];
    await cart.save();
    return cart;
  };

  deleteProductFromCart = async (cartId, productId) => {
    const cart = await CartModel.findById(cartId);
    const productIndex = cart.products.findIndex((item) => item.item.toString() === productId);

    if (productIndex !== -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();
      return cart;
    } else {
      throw new Error("Product not found in cart");
    }
  };

  updateCart = async (cartId, newProducts) => {
    const cart = await CartModel.findByIdAndUpdate(
      cartId,
      { products: newProducts },
      { new: true }
    );

    if (!cart) {
      throw new Error("Cart not found");
    }

    return cart;
  };
}


