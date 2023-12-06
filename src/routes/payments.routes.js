import { Router } from "express";
import { createSession, success, cancel } from "../controllers/payments.controllers.js";
import passport from "passport";


const router = Router();

router.post("/create-checkout-session", passport.authenticate("jwt", { session: false }), createSession);
router.get("/success/", passport.authenticate("jwt", { session: false }) , success);
router.get("/cancel", passport.authenticate("jwt", { session: false }) , cancel);

export default router;