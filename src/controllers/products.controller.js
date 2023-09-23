// products.controller.js

import { productService } from "../services/index.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
        const result = await productService.getProducts();
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch products' });
    }
};

// Get a product by ID
export const getProductById = async (req, res) => {
    const { pid } = req.params;
    try {
        const result = await productService.getProductById(pid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to fetch product' });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    const product = req.body;
    try {
        const result = await productService.createProduct(product);
        res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to create product' });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    const { pid } = req.params;
    const updatedProduct = req.body;
    try {
        const result = await productService.updateProduct(pid, updatedProduct);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to update product' });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const result = await productService.deleteProduct(pid);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Failed to delete product' });
    }
};
