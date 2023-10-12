import { cartService, productService } from "../services/index.js";

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
    const {user} = req.user;
    const cart = await cartService.getCartById(user.cartId);
    console.log("cart get controller111111111111111", cart)
    res.status(200).json(cart);
    // res.status(200).render("cart", cart);
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
    console.log("user cart controller", user);
    console.log("pid cart controller", pid);
    console.log("quantity cart controller", quantity);
    await cartService.addProductCartById(user, pid, quantity);
    res.status(200).redirect("http://localhost:8080/api/products");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductCartById = async (req, res) => {
  try {
    const { user } = req.user;
    const pid = req.params.pid;
    const idProduct = new Types.ObjectId(pid);

    await cartService.deleteProductCartById(user, idProduct);
    res.status(200).redirect("http://localhost:8080/api/cart/:cid");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartUserById = async (req, res) => {
  try {
    const { user } = req.user;
    const cart = await cartService.getCartUserById(user);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTicketsByUserById = async (req, res) => {
  try {
    const { user } = req.user;
    

    // Llama al método del servicio para crear y guardar el ticket
    const ticket = await cartService.createAndSaveTicket(user);

    
    res.status(200).json({ message: 'Compra exitosa', ticket: ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const updateProductCartById = async (req, res) => {
  try {
    const { user } = req.user;
    const pid = req.params.pid;
    const idProduct = new Types.ObjectId(pid);
    const quantity = parseInt(req.body.quantity || 1);
    console.log("Cart Controller: user: {0}, pid: {1}, quantity: {2}", user, pid, quantity);

    await cartService.addProductCartById(user, idProduct, quantity);
    res.status(200).redirect("http://localhost:8080/api/cart/:cid");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};