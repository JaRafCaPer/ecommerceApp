import { Router } from "express";
import passport from "passport";
import { generateProducts } from "../utils.js";
import { getMessages, saveMessage } from "../controllers/messages.controllers.js";
import updateLastConnection from "../middleware/lastConnectionMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home", {});
});

router.get("/failregister", async (req, res) => {
  res.send({ error: "failed" });
});

router.get("/register", (req, res) => {
  if (req.session?.user) return res.redirect("/api/products");
  res.render("register", {});
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { user } = req.user;
    res.render("profile", user);
  }
);

router.get(
  "/login-github", 
  passport.authenticate("github", { scope: ["user:email"] }),
);
router.get(
  "/githubcallback", 
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    res
      .cookie("keyCookieForJWT", req.user.token)
      .redirect("/api/products");
  }
);

router.get("/login",  (req, res) => {
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

router.get("/mockingproducts", async (req, res) => {
  let products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateProducts());
  }
  res.send({ status: "success", payload: products });
});

router.get("/loggerTest", (req, res) => {
  req.logger.info("Info");
  req.logger.debug("Debug");
  req.logger.http("Http");
  req.logger.error("Error");
  req.logger.fatal("Fatal");
  req.logger.warning("Warning");
  res.send("Logger testing");
});

router.get('/chat', getMessages)
router.post('/chat', saveMessage)


export default router;