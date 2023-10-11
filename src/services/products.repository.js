import ProductDTO from "../DTO/products.dto.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateProductsErrorInfo } from "../errors/info.js";

export default class ProductRepository {
  constructor(productDAO) {
    this.productDAO = productDAO;
  }
  async addProduct(data) {
    try {
      const productExist = await this.productDAO.getProductByCode(data.code);
      if(productExist) {
        CustomError.createError({
          name: "Error",
          message: "Product already exists",
          code: EErrors.PRODUCT_ALREADY_EXISTS,
          info: generateProductsErrorInfo(productExist),
        });
      }
      const product = await this.productDAO.addProduct(data);
      return new ProductDTO(product);
    } catch (error) {
      throw error;
    }
  }
  async getProducts() {
    try {
      const products = await this.productDAO.getProducts();
      return products.map((product) => new ProductDTO(product));
    } catch (error) {
      throw error;
    }
  }
  async getProductById(id) {
    try {
      const product = await this.productDAO.getProductById(id);
      return new ProductDTO(product);
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(id, data) {
    try {
      const product = await this.productDAO.updateProduct(id, data);
      return new ProductDTO(product);
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(id) {
    try {
      const product = await this.productDAO.deleteProduct(id);
      return new ProductDTO(product);
    } catch (error) {
      throw error;
    }
  }

  async getProductsPaginate(page, limit, queryParams, sort) {
    try {
      const products = await this.productDAO.getProductsPaginate(
        page,
        limit,
        queryParams,
        sort
      );
      const productsPrev = products.productsPrev;
      const productsNext = products.productsNext;
      const productsPrevValidate = products.productsPrevValidate;
      const productsNextValidate = products.productsNextValidate;
      const productsPaginate = products.productsPaginate;
      return {
        productsPaginate,
        productsPrev,
        productsNext,
        productsPrevValidate,
        productsNextValidate,
      };
    } catch (e) {
      throw e;
    }
  }

  async getProductsLimit(limit) {
    try {
      const products = await this.productDAO.getProductsLimit(limit);
      return products.map((product) => new ProductDTO(product));
    } catch (error) {
      throw error;
    }
  }
}
