import CustomError from "../../errors/CustomError.js";
import productModel from "./models/products.mongo.models.js";
import EErrors from "../../errors/enums.js";
import { generateProductsErrorInfo } from "../../errors/info.js";

export default class ProductsMongo {
  async addProduct(req) {
    try {
      const product = req;

      const newProduct = await productModel.create(product);

      return newProduct;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not added",
        code: EErrors.PRODUCT_NOT_ADDED,
        info: generateProductsErrorInfo(product),
      });
    }
  }

  async getProductById(id) {
    try {
      const pid = id;
      const product = await productModel.findOne({ _id: pid }).lean().exec();

      return product;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not found",
        code: EErrors.PRODUCT_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  }

  getProductsOrder = async (sort) => {
    const productsOrders = await ProductsModel.aggregate([
      {
        $sort: { price: sort },
      },
    ]);
    return productsOrders;
  };

  async getProductByOwner(owner, page, limit, queryParams, sort, category) {
    try {
      let query = {};
      if (owner) {
        query = {
          owner,
        };
      }
      if (category) {
        query = { owner, category };
      }

      if (queryParams) {
        const field = queryParams.split(",")[0];
        let value = queryParams.split(",")[1];
        if (!isNaN(parseInt(value))) value = parseInt(value);
        query[field] = value;
      }
      let products = await productModel.paginate(query, {
        page,
        limit,
        sort: { price: sort },
        lean: true,
      });

      products.prevLink = products.hasPrevPage
        ? `?page=${products.prevPage}&sort=${sort}&limit=${limit}&category=${category}`
        : "";
      products.nextLink = products.hasNextPage
        ? `?page=${products.nextPage}&sort=${sort}&limit=${limit}&category=${category}`
        : "";
      products.prevPageValidate = products.hasPrevPage
        ? `?page=${products.prevPage}&sort=${sort}&limit=${limit}&category=${category}`
        : "";
      products.nextPageValidate = products.hasNextPage
        ? `?page=${products.nextPage}&sort=${sort}&limit=${limit}&category=${category}`
        : "";

      const productsPrev = products.prevLink;
      const productsNext = products.nextLink;
      const productsPrevValidate = products.prevPageValidate;
      const productsNextValidate = products.nextPageValidate;

      return {
        products,
      };
    } catch (err) {
      CustomError.createError({
        name: "Error",
        message: "Product not found",
        code: EErrors.PRODUCT_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  }

  async getProducts() {
    try {
      const products = await productModel.find().lean().exec();

      return products;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Products not found",
        code: EErrors.PRODUCTS_NOT_FOUND,
        info: generateProductsErrorInfo(products),
      });
    }
  }

  async updateProduct(id, product) {
    try {
      // Buscar el producto existente por ID
      const existingProduct = await productModel.findById(id);

      if (!existingProduct) {
        throw new Error(`Product not found: ${id}`);
      }

      // Comparar las propiedades de existingProduct y product
      for (const key in product) {
        if (
          product.hasOwnProperty(key) &&
          existingProduct[key] !== product[key]
        ) {
          existingProduct[key] = product[key];
        }
      }

      // Actualizar el producto en la base de datos
      const productUpdated = await existingProduct.save();

      if (!productUpdated) {
        throw new Error("Product not updated");
      }

      return productUpdated;
    } catch (error) {
      // Manejar errores y lanzar una excepción si es necesario
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      return await productModel.findByIdAndDelete(id);
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not deleted",
        code: EErrors.PRODUCT_NOT_DELETED,
        info: generateProductsErrorInfo(product),
      });
    }
  }

  async getProductByCode(code) {
    try {
      return await productModel.findOne({ code }).lean().exec();
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not found",
        code: EErrors.PRODUCT_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  }

  getProductsOrder = async (sort) => {
    try {
      const productsOrders = await productModel.aggregate([
        {
          $sort: { price: sort },
        },
      ]);
      return productsOrders;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not found",
        code: EErrors.PRODUCT_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  };
  getProductsMatch = async (key, value, sort) => {
    try {
      const productMatch = await productModel.aggregate([
        {
          $match: { category: value[0] },
        },
        {
          $sort: { price: sort },
        },
      ]);
      return productMatch;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not found",
        code: EErrors.PRODUCT_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  };
  async getProductsPaginate(page, limit, queryParams, sort, category) {
    try {
      let query = { status: true };

      if (category) {
        query = { category };
      } else {
        query = {};
      }

      if (queryParams) {
        const field = queryParams.split(",")[0];
        let value = queryParams.split(",")[1];
        if (!isNaN(parseInt(value))) value = parseInt(value);
        query[field] = value;
      }

      let products = await productModel.paginate(query, {
        page,
        limit,
        sort: { price: sort },
        lean: true,
      });

      products.prevLink = products.hasPrevPage
        ? `?page=${products.prevPage}&sort=${sort}&limit=${limit}&category=${category}`
        : "";
      products.nextLink = products.hasNextPage
        ? `?page=${products.nextPage}&sort=${sort}&limit=${limit}&category=${category}`
        : "";
      products.prevPageValidate = products.hasPrevPage
        ? `?page=${products.prevPage}&sort=${sort}&limit=${limit}&category=${category}`
        : "";
      products.nextPageValidate = products.hasNextPage
        ? `?page=${products.nextPage}&sort=${sort}&limit=${limit}&category=${category}`
        : "";
      return {
        products,
      };
    } catch (err) {
      throw err;
    }
  }

  getProductsLimit = async (limit) => {
    try {
      const products = await productModel.find().lean().exec();
      return products.slice(0, limit);
    } catch (e) {
      CustomError.createError({
        name: "Error",
        message: "Product not found",
        code: EErrors.PRODUCT_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  };
  getCategories = async () => {
    try {
      return await productModel.distinct("category");
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Categories not found",
        code: EErrors.CATEGORIES_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  };

  searchProduct = async (search) => {
    try {
      const products = await productModel
        .find({
          $text: { $search: search },
        })
        .lean()
        .exec();
      return products;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not found",
        code: EErrors.PRODUCT_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  };

  async updateProductStatus(productId, newStatus) {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(
        productId,
        { status: newStatus }
      ).lean().exec();
  
      if (!updatedProduct) {
        throw new Error("Product not found");
      }
      
      return updatedProduct;
    } catch (error) {
      
      throw new Error("Failed to update product status");
    }
  }
}
