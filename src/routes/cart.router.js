import express from 'express';
import * as cartController from "../controllers/carts.controller.js";
import passport from 'passport';

const cartRouter = express.Router();

cartRouter.post('/', cartController.createCart);
cartRouter.post("/:cid/products/:pid", cartController.addProductToCart);
cartRouter.delete("/:cid/products/:pid", cartController.deleteProductFromCart);
cartRouter.put("/:cid", cartController.updateCart);
cartRouter.delete("/:cid/all", cartController.removeAllProductsFromCart);
cartRouter.get("/:cid/details", cartController.getCartDetails);
cartRouter.post('/:cid/purchase', passport.authenticate("jwt"), cartController.finalizePurchase);

export default cartRouter;
 