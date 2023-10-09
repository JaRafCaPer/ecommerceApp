// session.routes.js
import express from "express";
import { login, register, logout, currentUser } from "../controllers/sessions.controller.js";
import passport from "passport";

const sessionRouter = express.Router();

sessionRouter.post("/login", passport.authenticate("login"), login);
sessionRouter.post("/register", passport.authenticate("register"), register);
sessionRouter.get("/logout", logout);
sessionRouter.get("/current", passport.authenticate("jwt"), currentUser);

export default sessionRouter;
