import ProductDTO from "../DTO/product.dto.js";

export default class ProductService {
  constructor(productDAO) {
    this.productDAO = productDAO;
  }
  async addProduct(product) {
    try {
      const product = await this.productDAO.getProductByCode(product.code);
      if (!product) {
        const productAdded = await this.productDAO.addProduct(product);
        return new ProductDTO(productAdded);
      }
    } catch (error) {
      throw error;
    }
  }
  async getProduct() {
    try {
      const products = await this.productDAO.getProducts();
      return products;
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

  async updateProduct(id, product) {
    try {
      const productUpdated = await this.productDAO.updateProduct(id, product);
      return new ProductDTO(productUpdated);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const productDeleted = await this.productDAO.deleteProduct(id);
      return new ProductDTO(productDeleted);
    } catch (error) {
      throw error;
    }
  }
  async getPaginatedProducts(page, limit, queryParams, sort) {
    try {
      const products = await this.productDAO.getProductsPaginate(
        page,
        limit,
        sort,
        queryParams,
      );
     
      return {
        products
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
  async getCategories() {
    try {
      const categories = await this.productDAO.getCategories();
      return categories;
    } catch (error) {
      throw error;
    }
  }
}
