
import { productService } from "../services/index.js";

export default class CartService {
  constructor(dao) {
    this.dao = dao;
  }

  createNewCart = async () => {
    return await this.dao.createNewCart();
  }

  findCartById = async (cid) => {
    return await this.dao.getCartByID(cid);
  }

  addProductToExistingCart = async (cart, pid, quantity) => {
    console.log('Entrada: cart=', cart, 'pid=', pid, 'quantity=', quantity);

    // Buscar el índice del producto existente con el mismo pid en cart.products
    const productIndex = cart.products.findIndex(item => item._id.toString() === pid);

    if (productIndex !== -1) {
        // Si existe, incrementar la cantidad existente correctamente
        cart.products[productIndex].quantity += parseInt(quantity); // Asegurarse de que quantity sea un número
    } else {
        // Si no existe, agregar un nuevo producto
        cart.products.push({ _id: pid, quantity: parseInt(quantity) }); // Asegurarse de que quantity sea un número
    }

    console.log('Salida: cart=', cart);

    return await this.dao.updateCart(cart._id, cart);
}


  

  deleteProductFromExistingCart = async (cart, pid) => {
    cart.products = cart.products.filter(item => item.products.toString() !== pid);
    return await this.dao.updateCart(cart._id, cart);
  }

  updateExistingCart = async (cart, products) => {
    cart.products = products;
    return await this.dao.updateCart(cart._id, cart);
  }

  removeAllProducts = async (cart) => {
    cart.products = [];
    return await this.dao.updateCart(cart._id, cart);
  }


  getCartDetails = async (cartId) => {
    const cart = await this.dao.getCartByID(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
  
  
    const cartDetails = { items: [] };
  
  
    for (const item of cart.products) {
      // Obtener detalles del producto
      const productDetails = await productService.findProductById(item.products);
  
      cartDetails.items.push({
        productId: item.products,
        quantity: item.quantity,
        price: productDetails.price, 
      });
    }
  
    return cartDetails;
  }
  

  finalizeCartPurchase = async (cartId) => {
    const cart = await this.dao.getCartByID(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    
    const failedProducts = [];

    for (const item of cart.products) {
      const product = await productService.findProductById(item.products);
  
      if (product.stock < item.quantity) {
        failedProducts.push(item.products);
        continue;
      }
  
      // product.stock -= item.quantity;
      // await productService.update(product._id, product);
    }
  
    if (failedProducts.length > 0) {
      cart.products = cart.products.filter(item => !failedProducts.includes(item.products));
      await this.dao.updateCart(cart._id, cart);
    } else {
      cart.status = 'cerrado';
    }
  
    return { updatedCart: cart, failedProducts };
  }
}



