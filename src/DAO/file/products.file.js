import FileManager from "./file.manager.js";
import { v4 as uuidv4 } from "uuid";

export default class ProductsFile extends FileManager {
  constructor(filename = "products.json") {
    super(filename);
  }

  async addProduct(product) {
    try {
      const products = await this.get();
      product._id = uuidv4();
      products.push(product);
      await this.writeData(products);
      return product;
    } catch (error) {
      console.error("Error adding product:", error);
      return null;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.get();
      return products.find((product) => product._id === id);
    } catch (error) {
      console.error("Error getting product by ID:", error);
      return null;
    }
  }

  getProductsOrder = async (sort) => {
    try {
      const products = await this.get();
      return products.sort((a, b) =>
        sort === "asc" ? a.price - b.price : b.price - a.price
      );
    } catch (error) {
      console.error("Error getting ordered products:", error);
      return null;
    }
  };

  async getProductByOwner(owner, page, limit, queryParams, sort, category) {
    try {
      const products = await this.get();
      let filteredProducts = products.filter(
        (product) => product.owner === owner
      );

      if (category) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }

      if (queryParams) {
        const [field, value] = queryParams.split(",");
        const filteredValue = !isNaN(parseInt(value)) ? parseInt(value) : value;
        filteredProducts = filteredProducts.filter(
          (product) => product[field] === filteredValue
        );
      }

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      return {
        products: paginatedProducts,
        prevLink:
          startIndex > 0
            ? `?page=${
                page - 1
              }&sort=${sort}&limit=${limit}&category=${category}`
            : "",
        nextLink:
          endIndex < filteredProducts.length
            ? `?page=${
                page + 1
              }&sort=${sort}&limit=${limit}&category=${category}`
            : "",
        prevPageValidate:
          startIndex > 0
            ? `?page=${
                page - 1
              }&sort=${sort}&limit=${limit}&category=${category}`
            : "",
        nextPageValidate:
          endIndex < filteredProducts.length
            ? `?page=${
                page + 1
              }&sort=${sort}&limit=${limit}&category=${category}`
            : "",
      };
    } catch (error) {
      console.error("Error getting products by owner:", error);
      return null;
    }
  }

  async getProducts() {
    try {
      return await this.get();
    } catch (error) {
      console.error("Error getting products:", error);
      return null;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const products = await this.get();
      const productIndex = products.findIndex((product) => product._id === id);

      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...updatedProduct,
        };
        await this.writeData(products);
        return products[productIndex];
      }

      return null;
    } catch (error) {
      console.error("Error updating product:", error);
      return null;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.get();
      const productIndex = products.findIndex((product) => product._id === id);

      if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1)[0];
        await this.writeData(products);
        return deletedProduct;
      }

      return null;
    } catch (error) {
      console.error("Error deleting product:", error);
      return null;
    }
  }

  async getProductByCode(code) {
    try {
      const products = await this.get();
      return products.find((product) => product.code === code);
    } catch (error) {
      console.error("Error getting product by code:", error);
      return null;
    }
  }

  getProductsMatch = async (key, value, sort) => {
    try {
      const products = await this.get();
      const matchedProducts = products.filter(
        (product) => product[key] === value
      );
      return matchedProducts.sort((a, b) =>
        sort === "asc" ? a.price - b.price : b.price - a.price
      );
    } catch (error) {
      console.error("Error getting matched products:", error);
      return null;
    }
  };

  async getProductsPaginate(page, limit, queryParams, sort, category) {
    try {
      const products = await this.get();
      let filteredProducts = products.filter(
        (product) => product.status === true
      );

      if (category) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }

      if (queryParams) {
        const [field, value] = queryParams.split(",");
        const filteredValue = !isNaN(parseInt(value)) ? parseInt(value) : value;
        filteredProducts = filteredProducts.filter(
          (product) => product[field] === filteredValue
        );
      }

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      return {
        products: paginatedProducts,
        prevLink:
          startIndex > 0
            ? `?page=${
                page - 1
              }&sort=${sort}&limit=${limit}&category=${category}`
            : "",
        nextLink:
          endIndex < filteredProducts.length
            ? `?page=${
                page + 1
              }&sort=${sort}&limit=${limit}&category=${category}`
            : "",
        prevPageValidate:
          startIndex > 0
            ? `?page=${
                page - 1
              }&sort=${sort}&limit=${limit}&category=${category}`
            : "",
        nextPageValidate:
          endIndex < filteredProducts.length
            ? `?page=${
                page + 1
              }&sort=${sort}&limit=${limit}&category=${category}`
            : "",
      };
    } catch (error) {
      console.error("Error getting paginated products:", error);
      return null;
    }
  }

  getProductsLimit = async (limit) => {
    try {
      const products = await this.get();
      return products.slice(0, limit);
    } catch (error) {
      console.error("Error getting limited products:", error);
      return null;
    }
  };

  getCategories = async () => {
    try {
      const products = await this.get();
      return [...new Set(products.map((product) => product.category))];
    } catch (error) {
      console.error("Error getting categories:", error);
      return null;
    }
  };

  searchProduct = async (search) => {
    try {
      const products = await this.get();
      return products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching products:", error);
      return null;
    }
  };

  async updateProductStatus(productId, newStatus) {
    try {
      const products = await this.get();
      const productIndex = products.findIndex(
        (product) => product._id === productId
      );

      if (productIndex !== -1) {
        products[productIndex].status = newStatus;
        await this.writeData(products);
        return products[productIndex];
      }

      return null;
    } catch (error) {
      console.error("Error updating product status:", error);
      return null;
    }
  }
}
