import { Router } from "express";
import passport from "passport";
import { userPremium, uploadDocuments, getUsers, deleteUsers, getAdminPanel, deleteUserById } from "../controllers/users.controllers.js";
import uploadMiddleware from "../middleware/multer.js";
import { requireAdmin } from "../middleware/rol.verification.js";


const router = Router();

router.get("/",passport.authenticate("jwt", { session: false }), getUsers);

router.get(
  "/premium/:uid",
  passport.authenticate("jwt", { session: false }), 
  requireAdmin,
  userPremium
);


router.delete("/",
passport.authenticate("jwt",
 { session: false }),
  requireAdmin, deleteUsers);

router.get(
  "/admin-panel",
  passport.authenticate("jwt", { session: false }),
  requireAdmin,
  getAdminPanel

);

router.delete(
  "/:uid",
  passport.authenticate("jwt", { session: false }),
  requireAdmin,
  deleteUserById
);


router.post(
  "/:uid/documents",
  uploadMiddleware.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'product', maxCount: 1 },
    { name: 'documents' }
  ]),
  passport.authenticate("jwt", { session: false }),
  uploadDocuments
)




export default router;
