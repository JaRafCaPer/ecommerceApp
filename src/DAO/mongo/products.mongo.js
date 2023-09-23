// products.mongo.js

import ProductModel from "./models/products.mongo.model.js";

export default class Product {
    async getProducts() {
        try {
            return await ProductModel.find();
        } catch (error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            return await ProductModel.findOne({ _id: id });
        } catch (error) {
            throw error;
        }
    }

    async createProduct(productData) {
        try {
            return await ProductModel.create(productData);
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, updatedData) {
        try {
            return await ProductModel.findByIdAndUpdate(
                id,
                { $set: updatedData },
                { new: true } // Return the updated document
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const result = await ProductModel.findByIdAndRemove(id);
            if (result) {
                return { message: "Product deleted successfully" };
            } else {
                throw new Error("Failed to delete product");
            }
        } catch (error) {
            throw error;
        }
    }
}

