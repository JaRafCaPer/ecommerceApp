import express from 'express';
import * as viewController from "../controllers/views.controller.js"
import passport from 'passport';
  

const viewsRouter = express.Router(); 

viewsRouter.get('/list', viewController.getList);
viewsRouter.get('/products', viewController.getProductsViews);
viewsRouter.get('/products/:pid', viewController.getProductsByID);
viewsRouter.get("/", viewController.getLogin);
viewsRouter.get("/register", viewController.getRegister);
viewsRouter.get("/profile", viewController.getProfile);
viewsRouter.get('/chat', viewController.getChat); 
viewsRouter.get('/carts', viewController.getCarts);
viewsRouter.get("/carts/:cid", viewController.getCartByID);


//GITHUB

viewsRouter.get(
  `/login-github`,
  passport.authenticate('github', { scope: ['user:email'] }),
  async (request, response) =>{}
)


viewsRouter.get(
  `/githubcallback`,
  passport.authenticate(`github`, {failureFlash:`/`}),
  async (request, response) =>{
    console.log(`Callback:`, request.user)
    request.session.user = request.user 
    console.log(request.session)
    response.redirect(`/products`)

  }

)






export default viewsRouter;



