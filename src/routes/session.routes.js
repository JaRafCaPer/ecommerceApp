import { Router } from "express";
import passport from "passport";
import {
  loginUser,
  registerUser,
  getUserCurrent,
} from "../controllers/session.controllers.js";

const router = Router();

router.post("/login", loginUser);

router.post("/register", registerUser);


router.get("/login", (req, res) => {
    if (Object.keys(req.cookies).length != 0) return res.redirect("/api/products");
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
  
  router.get("/current",passport.authenticate("jwt", { session: false }), getUserCurrent);
  
  export default router;
  