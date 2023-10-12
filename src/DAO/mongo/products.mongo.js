import CustomError from "../../errors/CustomError.js";
import productModel from "./models/products.mongo.models.js";
import EErrors from "../../errors/enums.js";
import { generateProductsErrorInfo } from "../../errors/info.js";

export default class ProductsMongo {
  async addProduct(product) {
    try {
      return await productModel.create(product);
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
      return await productModel.findById(id).lean().exec();
    } catch (error) {
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
      return await productModel.find().lean().exec();
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
        if (!productUpdated) {
          CustomError.createError({
            name: "Error",
            message: "Product not updated",
            code: EErrors.PRODUCT_NOT_UPDATED,
            info: generateProductsErrorInfo(product),
          });
        }

        return productUpdated;
      }
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not updated",
        code: EErrors.PRODUCT_NOT_UPDATED,
        info: generateProductsErrorInfo(product),
      });
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
}
  getProductsMatch = async (key, value, sort) => {
    try{
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
}
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
      CustomError.createError({
        name: "Error",
        message: "Product not found",
        code: EErrors.PRODUCT_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  };

getProductsLimit =   async (limit) => {
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
  }
 getCategories =  async () => {
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
  }
}
