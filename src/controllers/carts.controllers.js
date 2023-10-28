import { cartService, productService } from "../services/index.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateCartErrorInfo } from "../errors/info.js";

export const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartByID = async (req, res) => {
  try {
    const { user } = req.user;
    const cart = await cartService.getCartById(user.cartId);
   
    res.status(200).render("cart", cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCartById = async (req, res) => {
  try {
    const cart = await cartService.updateCartById(
      req.params.cid,
      req.params.pid,
      req.body.quantity || 1
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCartById = async (req, res) => {
  try {
    const cart = await cartService.deleteCartById(req.params.id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProductCartById = async (req, res) => {
  try {
    const { user } = req.user;
    const pid = req.params.pid;
    const quantity = parseInt(req.body.quantity || 1);
    console.log("user", user,"pid:", pid, quantity)
    const result = await cartService.addProductCartById(user, pid, quantity);
    console.log("llegue", result );
    res.status(200).redirect("http://localhost:8080/api/products");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductCartById = async (req, res) => {
  try {
    const { user } = req.user;
    const pid = req.params.pid;
    console.log(pid + "pid");
    const cid = user.cartId;
    console.log(cid + "cid");
    await cartService.deleteProductCartById(cid, pid);
    res.status(200).json({ message: "Product deleted from cart", cart: cid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartUserById = async (req, res) => {
  try {
    const { user } = req.user;
   
    let cart = await cartService.getCartUserById(user);
    const totalCompra = cart.totalCompra;
    cart=cart.cart
    res.status(200).render("cart", {cart, user, totalCompra});
  } catch (error) {
    CustomError.createError({
      name: "Error",
      message: "Cart not found",
      code: EErrors.CART_NOT_FOUND,
      info: generateCartErrorInfo(req.user),
    });
  }
};

export const getTicketsByUserById = async (req, res) => {
  try {
    const { user } = req.user;
    let cart = await cartService.getCartById(user.cartId);
    if (!cart) {
      CustomError.createError({
        name: "Error",
        message: "Cart not products",
        code: EErrors.CART_NOT_FOUND,
        info: generateCartErrorInfo(req.user),
      });
    }else {
    const cartProducts = cart.products;
    const productsExceedingStock = [];
    for (const cartProduct of cartProducts) {
      const product = await productService.getProductById(cartProduct.pid);
      if (!product) {
        throw new Error(`Product not found: ${cartProduct.pid}`);
      }
      if (cartProduct.quantity > product.stock) {
        cartProduct.quantity = product.stock;
        productsExceedingStock.push({
          productId: product._id,
          productName: product.title,
          availableStock: product.stock,
        });
        
      }
    }
    if (productsExceedingStock.length > 0) {
      const errorMessages = productsExceedingStock.map(
        (product) =>
          `You can only buy up to ${product.availableStock} units of ${product.productName}.`
      );
      throw new Error(errorMessages.join("\n"));
    }

    const ticket = await cartService.createAndSaveTicket(user);
   

    for (const cartProduct of cartProducts) {
      const product = await productService.getProductById(cartProduct.pid);

      if (product) {
        const newStock = product.stock - cartProduct.quantity;

        await productService.updateProduct(product._id, { stock: newStock });
      }
    }
    await cartService.updateCartById(user.cartId, { products: [] });
    
    res.status(200).render("ticket", ticket);
  }} catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductCartById = async (req, res) => {
  try {
    const { user } = req.user;
    const pid = req.params.pid;
    const idProduct = new Types.ObjectId(pid);
    const quantity = parseInt(req.body.quantity || 1);
  
    await cartService.addProductCartById(user, idProduct, quantity);
    res.status(200).redirect("http://localhost:8080/api/cart/:cid");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
