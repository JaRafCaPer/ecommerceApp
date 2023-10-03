import ProductDTO from '../DAO/DTO/products.dto.js';

export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getProducts() {
    return await this.dao.getProducts();
  }

  async getProductById(productId) {
    return await this.dao.getProductById(productId);
  }

  async updateProduct(productId, updatedProductData) {
    if (updatedProductData.stock === 0) {
      updatedProductData.status = false;
    } else {
      updatedProductData.status = true;
    }

    updatedProductData._id = productId;
    return await this.dao.updateProduct(updatedProductData._id, updatedProductData);
  }

  async deleteProduct(productId) {
    return await this.dao.deleteProduct(productId);
  }

  async addProductToDatabase(product) {
    if (!(product instanceof ProductDTO)) {
      product = new ProductDTO(product);
    }

    if (parseInt(product.stock) === 0) {
      product.status = false;
    }

    return await this.dao.addProductToDatabase(product);
  }

  async updateStock(productId, newStockValue) {
    return await this.dao.updateStock(productId, newStockValue);
  }
}
