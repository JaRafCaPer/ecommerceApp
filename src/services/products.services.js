import ProductDTO from '../DAO/DTO/products.dto.js';

export default class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

  createNewProduct = async (productData) => {
    if (!productData.code) {
      productData.code = Math.floor(Math.random() * 100000);
    }

    const existingProduct = await this.dao.findProductByCode(productData.code);
    if (existingProduct) {
      throw new Error('El producto con este código ya existe');
    }

    if (productData.stock < 5 && productData.demand > 50) {
      productData.price *= 1.1;
    }

    const productToCreate = new ProductDTO(productData);
    if (productToCreate.stock >= 100) {
      throw new Error("El stock no puede ser mayor o igual a 100");
    }

    const createdProduct = await this.dao.create(productToCreate);
    return createdProduct;
  }

  deleteExistingProduct = async (productId) => {
    const deletedProduct = await this.dao.delete(productId);
    if (deletedProduct.deletedCount === 0) {
      throw new Error('Producto no encontrado');
    }
    return true;
  }

  updateExistingProduct = async (productId, updatedFields) => {
    const existingProduct = await this.dao.findProductById(productId);
    if (!existingProduct) {
      throw new Error('Producto no encontrado');
    }
    const updatedProduct = await this.dao.update(productId, updatedFields);
    return updatedProduct;
  }
  
}


