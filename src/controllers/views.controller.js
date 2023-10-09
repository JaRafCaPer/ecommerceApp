import * as viewsService from '../services/views.services.js';
import { cartService, productService } from '../services/index.js'
import config from '../config/config.js'





export const getProductsViews = async (req, res) => {
  try {
    const limit = parseInt(req.query?.limit || 10);
    const page = parseInt(req.query?.page || 1);
    const sort = parseInt(req.query?.sort || 1);
    const status = req.query?.status || '';

    const user = {
      _id: req.user._id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      password: req.user.password || '',
      rol: req.user.rol || 'user',
      cart: req.user.cart,
    };

    const cartId = req.user.cart;

    let products;
    switch (config.PERSISTENCE) {
      case 'MONGO':
        products = await viewsService.getPaginatedProducts(limit, page, sort, status);
        break;
      case 'FILE':
        products = await productService.getProducts(); // Use productService to get products
        break;
      default:
        break;
    }

    const categories = await viewsService.getCategories(); // Await for getCategories

    console.log("get Products:", products);
    console.log("get Categories:", categories);
    console.log("get user:", user);
    console.log("get cartId:", cartId);
    res.render('products', { products, cartId, user, categories });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error al obtener productos");
  }
};


export const getList = async (req, res) => {
  const result = await viewsService.getList(req.query);
  const user = req.session.user;
  res.render('productList', { ...result, user });
};

export const getProductsByID = async (req, res) => {
  const pid = req.params.pid
  const user = {
    _id: req.user._id,
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    age: req.user.age,
    password: req.user.password || '',
    rol: req.user.rol || 'user',
    cart: req.user.cart,
  };

  const cartId = req.user.cart;
  console.log('pid:', pid);
  const product = await productService.getProductsByID(pid);
  
  if (product) {
    console.log('getproductbyid', product, cartId);
    res.render('productDetails', {product, cartId});
  } else {
    res.status(404).send(`No se encuentra el producto`);
  }
};

export const getChat = async (req, res) => {
  const messages = await viewsService.getChat();
  const user = req.session.user;
  res.render('chat', { messages , user });
};

export const getCarts = async (req, res) => {
  const cart = await viewsService.getCarts();
  const items = cart[0].products
  console.log(cart);
  console.log('items:', items);
  res.render('carts',  {cart, items});
};

export const getCartByID = async (req, res) => {
  const cart = await cartService.findCartById(req.params.cid);
  const user = req.session.user;
  console.log(user);
  console.log('carrito', cart);
  if (cart) {
    const cartJSON = JSON.stringify(cart); 
    console.log('cartJSON:', cartJSON);
    res.render('cart', { cart, user });
  } else {
    res.status(404).send(`Carrito no encontrado`);
  }
};

export const getLogin = (req, res) => {
  res.render("login", {});
};

export const getRegister = (req, res) => {
  const errorMessage = req.flash('error')[0];
  res.render("register", { errorMessage });
};

export const getProfile = (req, res) => {
  console.log("Usuario de la sesión:", req.session.user); // Añade esto para depurar
  const user = req.session.user;
  res.render("profile", user);
};
