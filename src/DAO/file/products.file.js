import FileManager from './file.manager.js';

export default class ProductsFile extends FileManager {
  constructor(filename = 'products.json') {
    super(filename);
  }

  async addProduct(product) {
    const products = await this.get();
    products.push(product);
    await this.writeData(products);
    return product;
  }

  async getProductById(id) {
    const products = await this.get();
    return products.find((product) => product.id === id);
  }

  async getProducts() {
    return this.get();
  }

  async updateProduct(id, product) {
    const products = await this.get();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      products[productIndex] = product;
      await this.writeData(products);
      return product;
    }
    return null;
  }

  async deleteProduct(id) {
    const products = await this.get();
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1)[0];
      await this.writeData(products);
      return deletedProduct;
    }
    return null;
  }

  async getProductByCode(code) {
    const products = await this.get();
    return products.find((product) => product.code === code);
  }

  async getProductsOrder(sort) {
    const products = await this.get();
    return products.sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));
  }

  async getProductsMatch(key, value, sort) {
    const products = await this.get();
    const matchedProducts = products.filter((product) => product.category === value);
    return matchedProducts.sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));
  }

  async getProductsPaginate(page, limit, queryParams, sortParam) {
    const products = await this.get();
    let filteredProducts = [...products];

    if (queryParams) {
      const field = queryParams.split(',')[0];
      const value = queryParams.split(',')[1];

      filteredProducts = filteredProducts.filter((product) => {
        if (field in product) {
          return product[field] === value;
        }
        return false;
      });
    }

    if (sortParam === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortParam === 'desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return { products: paginatedProducts };
  }

  async getProductsLimit(limit) {
    const products = await this.get();
    return products.slice(0, limit);
  }

  async getCategories() {
    const products = await this.get();
    const categories = [...new Set(products.map((product) => product.category))];
    return categories;
  }
}
