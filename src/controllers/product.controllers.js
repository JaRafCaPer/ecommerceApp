import { productService } from "../services/index.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateProductsErrorInfo } from "../errors/info.js";

export const getListProducts = async (req, res) => {
  try {
    const { user } = req.user;
    const page = parseInt(req.query?.page || 1);
    const limit = parseInt(req.query?.limit || 10);
    const queryParams = req.query?.query || "";
    const category = req.query.category || "";
    const sortParam = req.query?.sort || "";

    let products;

    if (queryParams || sortParam || limit || page || category) {
    
      products = await productService.getListProducts(
        user.email,
        page,
        limit,
        queryParams,
        sortParam,
        category
      );
    }
    products = products.products;
    const categories = await productService.getCategories();
    const productsPrev = products.products.prevLink;
    const productsNext = products.products.nextLink;
    const prevPage = products.products.prevPage;
    const nextPage = products.products.nextPage;
    const limitPage = products.products.limit;
    const productsPrevValidate = products.products.prevPageValidate;
    const productsNextValidate = products.products.nextPageValidate;
    
    res.status(200).render("listProducts", {
      products,
      user,
      categories,
      productsPrev,
      productsNext,
      productsPrevValidate,
      productsNextValidate,
      prevPage,
      nextPage,
      limitPage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { user } = req.user;
    const { first_name, last_name, rol } = user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const queryParams = req.query.query || "";
    const category = req.query.category || "";
    const sort = parseInt(req.query.sort) || "";
  
    let products;
    if (page || limit || queryParams || sort || category) {
      
      products = await productService.getProductsPaginate(
        page,
        limit,
        queryParams,
        sort,
        category
        
      );
    } else {
      products = await productService.getProducts();
    }
   
    products = products.products.products;
    const productsPrev = products.prevLink;
    const productsNext = products.nextLink;
    const prevPage = products.prevPage;
    const nextPage = products.nextPage;
    const limitPage = products.limit;
    const productsPrevValidate = products.prevPageValidate;
    const productsNextValidate = products.nextPageValidate;
      
    const categories = await productService.getCategories();
  
    res.render("products", {
      products,
      categories,
      last_name,
      first_name,
      rol,
      prevPage,
      nextPage,
      limitPage, 
      productsPrev,
      productsNext,
      productsPrevValidate,
      productsNextValidate,
      user,
    });
  } catch (error) {
    req.logger.fatal("Error al obtener los productos");
    res.send({ error: error.message })
    ;
  }
};

export const getProductById = async (req, res) => {
  try {
    const productToDetailId = req.params.pid;
    let user = {}
    if (req.user.user) {
      user = req.user.user;
    } else {
      user = req.user;
    }
    const cartId = user.cartId;
    const product = await productService.getProductById(productToDetailId);
    res.status(200).render("productDetails", { product, user, cartId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const user = req.user;
    const newProduct = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      thumbnail: req.body.thumbnail,
      owner: req.body.owner,
      code: req.body.code,
      status: true,
    };
    const product = await productService.addProduct(newProduct);
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const product = await productService.updateProductById(
      req.params.id,
      req.body
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const user = req.user.user;
    
    const productId = req.params.pid;
    
    const product = await productService.deleteProductById(
      productId,
      user.email
    );
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const query = req.body.query;
    const products = await productService.searchProduct(query);
    res.status(200).render("search",{products});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateProductStatus = async (req, res) => {
  try {
    const productId = req.params.pid;
    const status = req.body.status;

    const product = await productService.updateProductStatus(productId, status);
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}