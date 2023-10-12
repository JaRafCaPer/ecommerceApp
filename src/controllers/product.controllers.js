import { productService } from "../services/index.js";

export const getProducts = async (req, res) => {
    try {
        
        const {user} = req.user;
        const cartId = user.cartId;
        console.log(user)
        const page= parseInt(req.query?.page || 1)
        const limit= parseInt(req.query?.limit || 10)
        const queryParams = req.query?.query || ''
        const sortParam = req.query?.sort || ''
        
        
    let products
    if (queryParams || sortParam || limit || page) {
        
         products = await productService.getPaginatedProducts(page,limit,queryParams,sortParam);
        
    }else{
         products = await productService.getProduct();

    }
    
    
   if (!products.products.products.docs){
    

    products = products.products
    products.docs = products.products
   } else{
    products = products.products
   }
   
    
    
    const categories = await productService.getCategories();
    console.log('products al render en products controller',products)
    res.status(200).render("products", { products, user, cartId, categories });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }

}
export const getProductById = async (req, res) => {
    try {
        const quees = req.query;
        console.log(quees);
        const product = await productService.getProductById(req.params.id);
        res.status(200).render("productDetails", { product,user ,cartId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const product = await productService.addProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProductById = async (req, res) => {
    try {
        const product = await productService.updateProductById(req.params.id, req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProductById = async (req, res) => {
    try {
        const product = await productService.deleteProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }


}
