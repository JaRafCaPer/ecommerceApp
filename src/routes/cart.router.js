import { Router } from 'express';
import CartModel from '../DAO/mongoManager/models/cart.model.js';
import ProductModel from '../DAO/mongoManager/models/product.model.js';

const router = Router();

router.get('/', async (req, res) => {
  const result = await CartModel.find();
  res.send(result);
});

router.get('/:cid', async (req, res) => {
  try {
    const cart = await CartModel.findById(req.params.cid).populate('products').lean().exec();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const result = await CartModel.create({ products: [] });
  res.send(result);
});

router.post("/:cid/products", async (req, res) => {
  try {
    const cid = req.params.cid;
    const productsToAdd = req.body.products;

    const cart = await CartModel.findById(cid);

    for (const productToAdd of productsToAdd) {
      const existingProductIndex = cart.products.findIndex(item => item.item.toString() === productToAdd.item);

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += productToAdd.quantity;
      } else {
        cart.products.push({ item: productToAdd.item, quantity: productToAdd.quantity });
      }
    }

    const updatedCart = await cart.save();

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    const cart = await CartModel.findById(cid);
    const productIndex = cart.products.findIndex(item => item.product === pid);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
      const updatedCart = await cart.save();
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid; // Cart ID

    const cart = await CartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.products = []; 
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid; // Cart ID
    const pid = req.params.pid; // Product ID

    const cart = await CartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(item => item.item.toString() === pid);

    if (productIndex !== -1) {
      cart.products.splice(productIndex, 1); 
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid; // Cart ID
    const pid = req.params.pid; // Product ID
    const newQuantity = req.body.quantity; // New quantity from request body

    const cart = await CartModel.findById(cid);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(item => item.item.toString() === pid);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = newQuantity; // Update the quantity
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Product not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

