import { Router } from "express";
import ProductModel from '../DAO/mongoManager/models/product.model.js'
import messageModel from "../DAO/mongoManager/models/message.model.js";
import cartModel from "../DAO/mongoManager/models/cart.model.js";

const router = Router()


router.get('/products', async (req, res) => {
    const products = await ProductModel.find().lean().exec()
    res.render('products', {products })
})

router.get('/products/:pid', async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await ProductModel.findById(pid).lean().exec();
    console.log(product);
    if (product) {
      res.render('productDetails', { product });
    } else {
      res.status(404).send({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/list', async (req, res) => {

  const page= parseInt(req.query?.page || 1)
  const limit= parseInt(req.query?.limit || 10)
  const queryParams = req.query?.query || ''
  const queryParam = req.query?.query || ''
  const sortParam = req.query?.sort || ''


 // Creamos un objeto vacío para la consulta
    const query = {}
    let sort = {}
    // Creamos un objeto para el ordenamiento por precio
  const sortQuery = {};

//dividimos la informacion obtenida en query
  if (queryParams) {
    const field = queryParams.split (',')[0]
    const value = queryParams.split (',')[1] 

    if(!isNaN(parseInt(value))) value = parseInt(value)
    
    query[field] = value
  }
  // Agregamos lógica para filtrar por categoría si se seleccionó una categoría válida
  if (query.category && query.category !== '') {
    query['category'] = query.category;
  } else {
    delete query.category; // Si no se seleccionó ninguna categoría, eliminamos el filtro de categoría
  }
 // Agregamos lógica para ordenar por precio
 if (sortParam === 'asc' || sortParam === 'desc') {
  sortQuery['price'] = sortParam === 'asc' ? 1 : -1;
}

  try {
    const result = await ProductModel.paginate(query, {
      page,
      limit,
      sort: sortQuery, 
      lean: true,

    });
    console.log(result);
    const categories = await ProductModel.distinct('category').lean().exec();
    
    console.log(categories);
    res.render('productsList', {
      ...result,
      categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.get('/realtimeproducts', async (req, res) => {
    console.log("get products")
    const products = await ProductModel.find().lean().exec()
    res.render('products_realtime', { products })
})

router.get('/form-products', async (req, res) => {
    res.render('form', {})
})

router.get('/chat', async (req, res) => {
    try {
        const messages = await messageModel.find().lean().exec();
        res.render('chat', { messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/form-products', async (req, res) => {
    const data = req.body
    const result = await ProductModel.create(data)

    res.redirect('/')
})



router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await cartModel
      .findById(req.params.cid)
      .populate('products.item')
      .lean()
      .exec();

    // Console log
    console.log(cart);

    res.render('cart', { cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router