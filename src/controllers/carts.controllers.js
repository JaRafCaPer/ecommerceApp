import { cartRepository } from "../services/index.js";
import { Types } from "mongoose";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateCartErrorInfo } from "../errors/info.js";

export const createCart = async (req, res) => {
  try {
    const cart = await cartRepository.createCart();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    res.status(200).json(await cartRepository.getCartById(req.params.id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCartById = async (req, res) => {
  try {
    const cart = await cartRepository.updateCartById(
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
    const cid = req.params.id;
    const cartId = new Types.ObjectId(cid);
    const cart = await cartRepository.deleteCartById(cartId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProductCartByID = async (req, res) => {
  try {
    const { user } = req.user;
    const pid = req.params.pid;
    const quantity = parseInt(req.body.quantity || 1);
    const idProduct = new Types.ObjectId(pid);
    await cartRepository.addProductCartByID(idProduct, quantity, user);
    res.status(200).redirect("http://localhost:8080/api/cart/user");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductCartByID = async (req, res) => {
  try {
    const cart = await cartRepository.deleteProductCartByID(
      req.params.cid,
      req.params.pid
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductOneCartById = async (req, res) => {
  try {
    const { user } = req.user;
    const pid = req.params.pid;
    await cartRepository.deleteProductOneCartById(user.cartId[0]._id, pid);
    res.redirect("http://localhost:8080/api/cart/user");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const { user } = req.user;
    const { cart, total } = await cartRepository.getCartUserById(user);
    const { first_name, last_name, rol, email } = user;
    if (cart) {
      res
        .status(200)
        .render("./cart", { cart, first_name, last_name, email, rol, total });
    } else {
      CustomError.createError({
        name: "Error",
        message: "Cart not found",
        code: EErrors.CART_NOT_FOUND,
        info: generateCartErrorInfo(req.user),
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductCartById = async (req, res) => {
  try {
    const pid = req.params.pid;
    const cid = req.params.cid;
    await cartRepository.deleteProductOneCartById(cid, pid);
    res.redirect("http://localhost:8080/api/carts/user");
  } catch (e) {
    res.status(500).json({ error: error.message });
  }
};

export const getTicketCartUserById = async (req, res) => {
  try {
    const { user } = req.user;
    const ticket = await cartRepository.getTicketCartUserById(user);
    if (ticket) {
      res.status(200).render("ticket", ticket);
    } else {
      CustomError.createError({
        name: "Error",
        message: "Cart not products",
        code: EErrors.CART_NOT_FOUND,
        info: generateCartErrorInfo(req.user),
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
