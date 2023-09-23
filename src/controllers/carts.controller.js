// carts.controller.js

import { cartService } from "../services/index.js";

// Get all carts
export const getAllCarts = async (req, res) => {
    try {
        const result = await cartService.getAllCarts();
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch carts' });
    }
};

// Get a cart by ID
export const getCartById = async (req, res) => {
    const { cid } = req.params;
    try {
        const result = await cartService.getCartById(cid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch cart' });
    }
};

// Create a new cart
export const createCart = async (req, res) => {
    try {
        const result = await cartService.createCart();
        res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to create cart' });
    }
};

// Add products to a cart
export const addProductsToCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
        const result = await cartService.addProductsToCart(cid, products);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to add products to cart' });
    }
};

// Update the quantity of a product in a cart
export const updateProductQuantityInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const result = await cartService.updateProductQuantityInCart(cid, pid, quantity);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to update product quantity in cart' });
    }
};

// Delete a cart by ID
export const deleteCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const result = await cartService.deleteCart(cid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to delete cart' });
    }
};

// Delete a product from a cart
export const deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const result = await cartService.deleteProductFromCart(cid, pid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to delete product from cart' });
    }
};

// Update the entire cart
export const updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
        const result = await cartService.updateCart(cid, products);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to update cart' });
    }
};
