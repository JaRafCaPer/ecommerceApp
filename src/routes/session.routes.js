import { Router } from "express";
import passport from "passport";
import {
  loginUser,
  registerUser,
  getUserCurrent,
  resetearPassword,
  restart,
  resetPasswordForm,
  getTicketByUser,
  validPassword,
} from "../controllers/session.controllers.js";
import updateLastConnection from "../middleware/lastConnectionMiddleware.js";
import { getTicketById } from "../controllers/carts.controllers.js";

const router = Router();

router.post("/login", loginUser, updateLastConnection);

router.post("/register", registerUser);

router.get("/login", (req, res) => {
  if (Object.keys(req.cookies).length != 0)
    return res.redirect("/api/products");
  res.render("login", {});
});

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }), updateLastConnection,
  (req, res) => {
    res.clearCookie("keyCookieForJWTJRCP").redirect("/api/session/login");
  }
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { user } = req.user;
    res.render("profile", user);
  }
);
router.get(
  "/ticket/user",
  passport.authenticate("jwt", { session: false }),
  getTicketByUser
);
router.get(
  "/ticket/user/:tid",
  passport.authenticate("jwt", { session: false }),
  getTicketById
);
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getUserCurrent
);

router.get("/resetPassword", resetearPassword);

router.post("/restart", restart);

router.get("/resetPasswordForm/:token", resetPasswordForm);

router.post("/validPassword", validPassword);

export default router;
