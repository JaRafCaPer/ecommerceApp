import { Router } from "express";
import passport from "passport";

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
  async (req, res) => {}
);
router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    console.log("Callback: ", req.user);
    res
      .cookie("keyCookieForJWT", req.user.token)
      .redirect("/api/products");
  }
);

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

export default router;