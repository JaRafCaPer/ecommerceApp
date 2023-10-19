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
      if(owner){
        query = {
          owner
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
      let products = await productModel.paginate(
        query,
        {
          page,
          limit,
          sort: { price: sort },
          lean: true,
        });
        console.log("products in getProductByOwner mongo", products);
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
      console.log("products in getProductByOwner mongo", products);
      console.log("productsPrev in getProductByOwner mongo", productsPrev);
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
      console.log("products in getProducts mongo", products);
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
  async getProductsPaginate  (page, limit, queryParams, sort, category) {
    try {
        let query = {};
        
        if (category) {
          query = { category };
        }else{ query = {}}
     
      console.log("query in getProductsPaginate mongo", query)
      if (queryParams) {
        const field = queryParams.split(",")[0];
        let value = queryParams.split(",")[1];
        if (!isNaN(parseInt(value))) value = parseInt(value);
        query[field] = value;
      }
      console.log("sort value in getProductsPaginate mongo", sort)
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
      
      console.log('esta a punto de salir de getProductsPaginate')
      
      const productsPrev = products.prevLink;
      const productsNext = products.nextLink;
      const productsPrevValidate = products.prevPageValidate;
      const productsNextValidate = products.nextPageValidate;
      
      return {
        products,
      };
    } catch (err) {
      throw err;
    }
  };

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
}
