import ProductDTO from "../DTO/product.dto.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import {
  generateProductsErrorInfo,
} from "../errors/info.js";

export default class ProductService {
  constructor(productDAO) {
    this.productDAO = productDAO;
  }
  async addProduct(req) {
    try {
      const product = req;
      
      const productCode =  await this.productDAO.getProductByCode(product.code);
    
      if (!productCode) {
       
        const productAdded = await this.productDAO.addProduct(product);
     
        return new ProductDTO(productAdded);
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

  async deleteProductById(pid, uid) {
    try {
      const productDeleted = await this.productDAO.deleteProduct(id);
      return new ProductDTO(productDeleted);
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Product not deleted",
        code: EErrors.PRODUCT_NOT_DELETED,
        info: generateProductsErrorInfo(product),
      });
    }

    // try {
    //     const productToDelete = await this.productDAO.getProductById(pid);
    //     const user = await this.userDAO.getUserById(uid);
    //     if (!user) {
    //         throw new CustomError(EErrors.USER_NOT_FOUND, generateProductsErrorInfo(req.params.id));
    //     }
    //     if (user.rol === "admin"){
    //         const product = await productService.deleteProductById(productToDelete);
    //         res.status(200).json(product);
    //     }
    //     if (user.rol === "premium"){
    //         const productPremium = await productService.getProductById(productToDelete);
    //         if(productPremium.owner === user.email){
    //             const product = await productService.deleteProductById(productToDelete);
    //             res.status(200).json(product);}
    //     }
        
    //     res.status(200).json(product);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }



  }






  async getPaginatedProducts(page, limit, queryParams, sort) {
    try {
      const products = await this.productDAO.getProductsPaginate(
        page,
        limit,
        sort,
        queryParams,
      );
     
      return {
        products
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
}
