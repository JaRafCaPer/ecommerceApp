import { Router } from "express";
import passport from "passport";
import { userPremium, uploadDocuments } from "../controllers/users.controllers.js";


const router = Router();

router.get(
  "/premium/:uid",
  passport.authenticate("jwt", { session: false }),
  userPremium
);

router.post( "/:uid/documents", passport.authenticate("jwt", { session: false }), uploadDocuments

)




export default router;
