
import { CartService, ProductService } from '../services/index.js';

export const createCart = async (req, res) => {
  try {
    const cart = req.body;
    const createdCart = await CartService.createCart(cart);
    res.status(201).json({ status: 'success', payload: createdCart });
  } catch (error) {
    res.status(500).json({ status: 'error', payload: 'Unexpected error: cart not created' });
  }
};

export const getAllCarts = async (req, res) => {
  try {
    const populate = req.query?.populate === 'true';
    const allCarts = await CartService.getAllCarts(populate);
    res.status(200).json({ status: 'success', payload: allCarts });
  } catch (error) {
    res.status(500).json({ status: 'error', payload: 'An error occurred while fetching carts' });
  }
};

export const getCartById = async (req, res) => {
  try {
    const id = req.params.cId;
    const cart = await CartService.getCartById(id);
    if (!cart) {
      return res.status(404).json({ status: 'error', payload: 'The cart does not exist.' });
    }
    res.status(200).json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', payload: 'An error occurred while fetching the cart' });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const cartId = req.params.cId;
    const prodId = req.params.pId;
    const result = await CartService.addProductToCart(cartId, prodId);
    if (!result) {
      return res.status(400).json({ status: 'error', payload: 'Failed to add the product to the cart' });
    }
    res.status(201).json({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).json({ status: 'error', payload: 'An error occurred while adding the product to the cart' });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cartId = req.params.cId;
    const result = await CartService.clearCart(cartId);
    if (!result) {
      return res.status(400).json({ status: 'error', payload: 'Error clearing the cart' });
    }
    res.status(200).json({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).json({ status: 'error', payload: 'An error occurred while clearing the cart' });
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const cartId = req.params.cId;
    const prodId = req.params.pId;
    const result = await CartService.deleteProductFromCart(cartId, prodId);
    if (!result) {
      return res.status(400).json({ status: 'error', payload: 'Failed to delete the product from the cart' });
    }
    res.status(200).json({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).json({ status: 'error', payload: 'An error occurred while deleting the product from the cart' });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cId;
    const result = await CartService.deleteCart(cartId);
    if (!result) {
      return res.status(400).json({ status: 'error', payload: 'Error deleting the cart' });
    }
    res.status(200).json({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).json({ status: 'error', payload: 'An error occurred while deleting the cart' });
  }
};

export const updateQuantityFromCart = async (req, res) => {
  try {
    const cartId = req.params.cId;
    const prodId = req.params.pId;
    const quantity = parseInt(req.body.quantity);

    const findedCart = await CartService.getCartById(cartId);
    const isRepeated = findedCart.products.find(prod => prod.product?._id.toString() === prodId);

    if (isRepeated) {
      isRepeated.quantity += quantity;
      await CartService.updateCart(cartId, findedCart.products);
      res.status(200).json({ status: 'success', payload: findedCart });
    } else {
      res.status(404).json({ status: 'error', payload: 'Product not found in the cart' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', payload: 'An error occurred while updating the cart' });
  }
};

export const updateCart = async (req, res) => {
  try {
    const cartId = req.params.cId;
    const products = req.body.products;
    const updateCart = await CartService.updateCart(cartId, products);
    if (!updateCart) {
      return res.status(400).json({ status: 'error', payload: 'One or more products were not found' });
    }
    res.status(201).json({ status: 'success', payload: updateCart });
  } catch (error) {
    res.status(500).json({ status: 'error', payload: 'An error occurred while updating the cart' });
  }
};

export const purchaseProducts = async (req, res) => {
  try {
    const cartId = req.params.cId;
    const userEmail = req.user?.email || req.body.email;
    const ticket = await CartService.purchaseProducts(cartId, userEmail);
    if (!ticket) {
      return res.status(400).json({ status: 'error', payload: 'Failed to purchase products' });
    }
    res.status(201).json({ status: 'success', payload: ticket });
  } catch (error) {
    res.status(500).json({ status: 'error', payload: 'An error occurred while processing the purchase' });
  }
};
