import { Router } from "express";
import {renderProducts, renderProductById,renderCartById, login,chat,profile, register, productList, realTimeProducts, formProducts, getFormProducts} from '../controllers/views.controller.js'
import passport from "passport";
const router = Router()

// function auth(req, res, next) {
//     if(req.session?.user) return next()
//     res.redirect('/')
//   }

router.get('/products', passport.authenticate('jwt', { session: false }), renderProducts

// passport.authenticate('jwt', { session: false }), async (req, res) => {
//     const products = await ProductModel.find().lean().exec()
//     const carts = await cartModel.find();
//     const cartId = carts ? carts[0]._id : null
//     const user = req.user;
//     console.log('Proiducts:', user);
//     res.render('products', {products, cartId, user})
// }

)

router.get('/products/:pid', renderProductById 

// async (req, res) => {
//   const { pid } = req.params;
//   try {
//     const product = await ProductModel.findById(pid).lean().exec();
//     console.log(product);
//     const carts = await cartModel.find();
//     console.log(carts);
//     const cartId = carts ? carts[0]._id : null
//     console.log(cartId);
//     if (product) {
//       res.render('productDetails', { product, cartId });
//     } else {
//       res.status(404).send({ message: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
);

router.get('/list', productList

// async (req, res) => {

//   const page= parseInt(req.query?.page || 1)
//   const limit= parseInt(req.query?.limit || 10)
//   const queryParams = req.query?.query || ''
//   const queryParam = req.query?.query || ''
//   const sortParam = req.query?.sort || ''


//  // Creamos un objeto vacío para la consulta
//     const query = {}
//     let sort = {}
//     // Creamos un objeto para el ordenamiento por precio
//   const sortQuery = {};

// //dividimos la informacion obtenida en query
//   if (queryParams) {
//     const field = queryParams.split (',')[0]
//     const value = queryParams.split (',')[1] 

//     if(!isNaN(parseInt(value))) value = parseInt(value)
    
//     query[field] = value
//   }
//   // Agregamos lógica para filtrar por categoría si se seleccionó una categoría válida
//   if (query.category && query.category !== '') {
//     query['category'] = query.category;
//   } else {
//     delete query.category; // Si no se seleccionó ninguna categoría, eliminamos el filtro de categoría
//   }
//  // Agregamos lógica para ordenar por precio
//  if (sortParam === 'asc' || sortParam === 'desc') {
//   sortQuery['price'] = sortParam === 'asc' ? 1 : -1;
// }

//   try {
//     const result = await ProductModel.paginate(query, {
//       page,
//       limit,
//       sort: sortQuery, 
//       lean: true,

//     });
//     console.log(result);
//     const categories = await ProductModel.distinct('category').lean().exec();
    
//     console.log(categories);
//     res.render('productsList', {
//       ...result,
//       categories,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

)

router.get('/realtimeproducts', realTimeProducts
// async (req, res) => {
//     console.log("get products")
//     const products = await ProductModel.find().lean().exec()
//     res.render('products_realtime', { products })
// }
)

router.get('/form-products', passport.authenticate('jwt', { session: false }), formProducts
// async (req, res) => {
//     res.render('form', {})
// }
)

router.post('/form-products', getFormProducts
// async (req, res) => {
//     const data = req.body
//     const result = await ProductModel.create(data)

//     res.redirect('/')
// }
)

router.get('/chat', passport.authenticate('jwt', { session: false }), chat

// async (req, res) => {
//     try {
//         const messages = await messageModel.find().lean().exec();
//         res.render('chat', { messages });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }
);



router.get('/carts/:cid', renderCartById
// async (req, res) => {
//   try {
//     const cart = await cartModel
//       .findById(req.params.cid)
//       .populate('products.item')
//       .lean()
//       .exec();

//     // Console log
//     console.log(cart);

//     res.render('cart', { cart });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
);

router.get('/', login
// (req, res) => {
//   if(req.session?.user) {
//       res.redirect('/profile')
//   }

//   res.render('login', {})
// }
)

router.get('/register', register
// (req, res) => {
//   if(req.session?.user) {
//       res.redirect('/profile')
//   }

//   res.render('register', {})
// }
)



router.get('/profile', passport.authenticate('jwt', { session: false }), profile
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {

//     const { user } = req
//     console.log('profile:', user)
//     res.render('profile', user)
//   }
)
export default router