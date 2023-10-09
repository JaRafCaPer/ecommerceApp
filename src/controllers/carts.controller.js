import { cartService, ticketService, productService } from '../services/index.js';


export const createCart = async (req, res) => {
  try {
    const newCart = await cartService.createNewCart();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
};

export const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const missingParams = [];

  // Check if 'cid' is missing
  if (!cid) {
    missingParams.push('cid');
  }

  // Check if 'pid' is missing
  if (!pid) {
    missingParams.push('pid');
  }

  // Check if 'quantity' is missing
  if (!quantity) {
    missingParams.push('quantity');
  }

  // If any parameters are missing, respond with a 400 (Bad Request) status
  if (missingParams.length > 0) {
    const errorMessage = `Missing parameters: ${missingParams.join(', ')}`;
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const cart = await cartService.findCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const updatedCart = await cartService.addProductToExistingCart(cart, pid, quantity);
    const targetUrl = '/products'; // Reemplaza con la URL que desees
    res.redirect(targetUrl);
    // res.status(200).json(updatedCart);
    
  } catch (err) {
    res.status(500).json({ error: 'Error adding product to the cart in controller' });
  }
};




export const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartService.findCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const updatedCart = await cartService.deleteProductFromExistingCart(cart, pid);
    res.status(200).json({ message: 'Producto eliminado del carrito', updatedCart });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
};

export const updateCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cart = await cartService.findCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const updatedCart = await cartService.updateExistingCart(cart, products);
    res.status(200).json(updatedCart);
    
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
};

export const removeAllProductsFromCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartService.findCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const updatedCart = await cartService.removeAllProducts(cart);
    res.status(200).json({ message: 'Todos los productos han sido eliminados', updatedCart });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar productos del carrito' });
  }
};

export const getCartDetails = async (req, res) => {
  const { cid } = req.params;
  try {
    const details = await cartService.getCartDetails(cid);
    if (!details) {
      return res.status(404).json({ error: 'Detalles del carrito no encontrados' });
    }
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los detalles del carrito' });
  }
};

export const finalizePurchase = async (req, res) => {
  const { cid } = req.params; // no se si es mejor mandarlo por http
  const user = req.user;
  // const cart = req.body.cart; // por si lo traigo del front , pero es mejor con el http

  try {
    const { updatedCart, failedProducts } = await cartService.finalizeCartPurchase(user, cid);
    
    res.status(200).json({
      message: 'Compra procesada',
      failedProducts,
      cart: updatedCart.products
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al finalizar la compra' });
  }
};
