import productModel from "./models/products.mongo.models.js";

export default class ProductsMongo {
  async addProduct(product) {
    try {
      return await productModel.create(product);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await productModel.findById(id).lean().exec();
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      return await productModel.find().lean().exec();
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, product) {
    try {
      const newProduct = await productModel.findById(id);

      if (!newProduct) {
        throw new Error(`Product not found: ${id}`);
      } else {
        // Actualiza solo los campos proporcionados en el objeto product
        if (product.stock !== undefined) {
          newProduct.stock = product.stock;
        }
        if (product.title !== undefined) {
          newProduct.title = product.title;
        }
        if (product.description !== undefined) {
          newProduct.description = product.description;
        }
        if (product.code !== undefined) {
          newProduct.code = product.code;
        }
        if (product.price !== undefined) {
          newProduct.price = product.price;
        }
        if (product.status !== undefined) {
          newProduct.status = product.status;
        }
        if (product.category !== undefined) {
          newProduct.category = product.category;
        }
        if (product.thumbnail !== undefined) {
          newProduct.thumbnail = product.thumbnail;
        }

        const productUpdated = await productModel.findByIdAndUpdate(id, {
          newProduct,
        });

        return productUpdated;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      return await productModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async getProductByCode(code) {
    try {
      return await productModel.findOne({ code }).lean().exec();
    } catch (error) {
      throw error;
    }
  }
  getProductsOrder = async (sort) => {
    const productsOrders = await productModel.aggregate([
      {
        $sort: { price: sort },
      },
    ]);
    return productsOrders;
  };
  getProductsMatch = async (key, value, sort) => {
    const productMatch = await productModel.aggregate([
      {
        $match: { category: value[0] },
      },
      {
        $sort: { price: sort },
      },
    ]);
    return productMatch;
  };
  getProductsPaginate = async (page, limit, queryParams, sortParam) => {
    try {
      let query = {};
      let sortQuery = {};

      if (queryParams) {
        const field = queryParams.split(",")[0];
        let value = queryParams.split(",")[1];
        if (!isNaN(parseInt(value))) value = parseInt(value);
        query[field] = value;
      }
      let products = await productModel.paginate(query, {
        page,
        limit,
        sort: sortQuery,
        lean: true,
      });

      // Agregamos lógica para filtrar por categoría si se seleccionó una categoría válida
      if (query.category && query.category !== "") {
        query["category"] = query.category;
      } else {
        delete query.category; // Si no se seleccionó ninguna categoría, eliminamos el filtro de categoría
      }
      // Agregamos lógica para ordenar por precio
      if (sortParam === "asc" || sortParam === "desc") {
        sortQuery["price"] = sortParam === "asc" ? 1 : -1;
      } else {
        return { products };
      }
    } catch (err) {
      throw err;
    }
  };

  async getProductsLimit(limit) {
    try {
      const products = await productModel.find().lean().exec();
      return products.slice(0, limit);
    } catch (e) {
      throw e;
    }
  }
  async getCategories() {
    try {
      return await productModel.distinct("category");
    } catch (error) {
      throw error;
    }
  }
}
