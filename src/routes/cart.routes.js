import {
  createCart,
  getCartByID,
  addProductCartById,
  updateProductCartById,
  deleteProductCartById,
  getCartUserById,
  getTicketsByUserById
} from "../controllers/carts.controllers.js";
import {requireUser} from "../middleware/rol.verification.js";
import { requirePremium } from "../middleware/rol.verification.js";

import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), createCart);
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  getCartUserById
);
router.get(
  "/pid/:pid",
  passport.authenticate("jwt", { session: false }),
  addProductCartById
);
router.get(
  "/delete/:pid",
  passport.authenticate("jwt", { session: false }),
  deleteProductCartById
);
router.put(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  updateProductCartById
);
router.get(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  getCartByID
);

router.post(
  "/:cid/products/:pid",
  passport.authenticate("jwt", { session: false }),(requireUser || requirePremium),
  addProductCartById
);

router.get("/:cid/purchase",passport.authenticate("jwt", { session: false }),getTicketsByUserById);


export default router


