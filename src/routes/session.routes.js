import { Router } from "express";
import { generateToken } from "../utils.js";
import passportCall from "../middlewares/passportCall.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { loginUser, registerUser, getUserCurrent } from "../controllers/session.controllers.js";
import passport from "passport";

const router = Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/login", (req, res) => {
  if (Object.keys(req.cookies).length != 0) return res.redirect("/profile");
  res.render("login", {});
});

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("keyCookieForJWT").redirect("/api/session/login");
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
  "/verificar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.render("verificar", {});
  }
);

router.get("/current",passport.authenticate("jwt", { session: false }), getUserCurrent);

export default router;
