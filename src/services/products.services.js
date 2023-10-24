import ProductDTO from "../DTO/product.dto.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateProductsErrorInfo } from "../errors/info.js";

export default class ProductService {
  constructor(productDAO, userDAO) {
    this.productDAO = productDAO;
    this.userDAO = userDAO;
  }
  async addProduct(req) {
    try {
      const product = req;

      const productCode = await this.productDAO.getProductByCode(product.code);

      if (!productCode) {
        const productAdded = await this.productDAO.addProduct(product);

        return productAdded;
      } else {
        CustomError.createError({
          name: "Error",
          message: "Product already exists",
          code: EErrors.PRODUCT_ALREADY_EXISTS,
          info: generateProductsErrorInfo(productExist),
        });
      }
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not added",
        code: EErrors.PRODUCT_NOT_ADDED,
        info: generateProductsErrorInfo(product),
      });
    }
  }
  async getProduct() {
    try {
      const products = await this.productDAO.getProducts();

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

  async getProductById(id) {
    try {
      const product = await this.productDAO.getProductById(id);
      if (!product) {
        CustomError.createError({
          name: "Error",
          message: "Product not exists",
          code: EErrors.PRODUCT_NOT_EXISTS,
          info: generateProductsErrorInfo(product),
        });
      }
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

  async updateProduct(id, product) {
    try {
      const productUpdated = await this.productDAO.updateProduct(id, product);
      return new ProductDTO(productUpdated);
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not updated",
        code: EErrors.PRODUCT_NOT_UPDATED,
        info: generateProductsErrorInfo(product),
      });
    }
  }
  async getListProducts(userMail, page, limit, queryParams, sort, category) {
    try {
      const products = await this.productDAO.getProductByOwner(
        userMail,
        page,
        limit,
        queryParams,
        sort,
        category
      );
      return {
        products,
      };
    } catch (e) {
      CustomError.createError({
        name: "Error",
        message: "Products not found",
        code: EErrors.PRODUCTS_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  }

  async deleteProductById(pid, umail) {
    try {
      const ProductId = pid;
      const userMail = umail;

      const userDel = await this.userDAO.getUserByEmail(userMail);

      if (!userDel) {
        CustomError.createError({
          name: "Error",
          message: "User not found",
          code: EErrors.USER_NOT_FOUND,
          info: generateProductsErrorInfo(userDel),
        });
      }
      if (userDel.rol === "admin") {
        const product = await this.productDAO.deleteProduct(ProductId);
        return new ProductDTO(product);
      }
      if (userDel.rol === "premium") {
        const productPremium = await this.productDAO.getProductById(ProductId);
        if (productPremium.owner === userDel.email) {
          const product = await this.productDAO.deleteProduct(ProductId);
          return product;
        }
      } else {
        return "You are not authorized to delete this product";
      }
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not deleted",
        code: EErrors.PRODUCT_NOT_DELETED,
        info: generateProductsErrorInfo(product),
      });
    }
  }

  async getProductsPaginate(page, limit, queryParams, sort, category) {
    try {
      const products = await this.productDAO.getProductsPaginate(
        page,
        limit,
        queryParams,
        sort,
        category
      );

      return {
        products,
      };
    } catch (e) {
      CustomError.createError({
        name: "Error",
        message: "Products not found",
        code: EErrors.PRODUCTS_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  }

  async getProductsLimit(limit) {
    try {
      const products = await this.productDAO.getProductsLimit(limit);
      return products.map((product) => new ProductDTO(product));
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Products not found",
        code: EErrors.PRODUCTS_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  }
  async getCategories() {
    try {
      const categories = await this.productDAO.getCategories();
      return categories;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Categories not found",
        code: EErrors.CATEGORIES_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  }
  async searchProduct(queryParams) {
    try {
      const products = await this.productDAO.searchProduct(queryParams);
      return products;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Products not found",
        code: EErrors.PRODUCTS_NOT_FOUND,
        info: generateProductsErrorInfo(product),
      });
    }
  }

  async updateProductStatus(productId, status) {
    try {
      const product = await this.productDAO.updateProductStatus(productId, status);
      return new ProductDTO(product);
    } catch (error) {
      // Handle the error if needed
      throw new Error("Failed to update product status");
    }
  }

}
