import ProductModel from '../mongo/models/products.mongo.model.js';


export default class ProductManager{
 async getProducts() {
  try {
    const result = await ProductModel.find();
    return result;
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
}


async getProductById(pid) {
  try {
    const result = await ProductModel.findById(pid);
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  } catch (error) {
    throw new Error('Error fetching product by ID:'+ error.message);
  }
}

 async updateProduct(pid, updatedParams) {
  try {
    const result = await ProductModel.findByIdAndUpdate(
      pid,
      updatedParams,
      { new: true } // This option returns the updated document
    );
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  } catch (error) {
    throw new Error('Error updating product: ' + error.message);
  }
}

 async createProduct(data) {
  try {
    const result = await ProductModel.create(data);
    return result;
  } catch (error) {
    throw new Error('Error creating product: ' + error.message);
  }
}

 async deleteProduct(pid) {
  try {
    const result = await ProductModel.findByIdAndRemove(pid);
    if (!result) {
      throw new Error('Product not found');
    }
    return { message: 'Product deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting product: ' + error.message);
  }
}

 }