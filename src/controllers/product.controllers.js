import { productService } from "../services/index.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import {
  generateProductsErrorInfo,
} from "../errors/info.js";


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
        const productToDetailId = req.params.pid;
        const user = req.user;
        const cartId = user.user.cartId;
        const product = await productService.getProductById(productToDetailId);
        res.status(200).render("productDetails", { product,user ,cartId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const user = req.user;
        const newProduct = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            thumbnail: req.body.thumbnail,
            owner: req.body.owner,
            code: req.body.code,
            status: true,
        };
        console.log('newProduct in createProduct controller',newProduct)
        console.log('user in createProduct controller',user)
       
        const product = await productService.addProduct(newProduct);
       
        res.status(200).render("realTimeProduct", { product });
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
            const user = req.user;
            const productId = req.params.id;
            console.log('user in delete product controller ',user)
            console.log('productIn in delete product controller ',productId)
            const product = await productService.deleteProductById(productId, user.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    
    
    
    // try {
    //     const productToDelete = await productService.getProductById(req.params.id);
    //     const user = await userService.getUserById(req.user.id);
    //     if (!user) {
    //         throw new CustomError(EErrors.USER_NOT_FOUND, generateProductsErrorInfo(req.params.id));
    //     }
    //     if (user.rol === "admin"){
    //         const product = await productService.deleteProductById(productToDelete);
    //         res.status(200).json(product);
    //     }
    //     if (user.rol === "premium"){
    //         const productPremium = await productService.getProductById(productToDelete);
    //         if(productPremium.owner === user.email){
    //             const product = await productService.deleteProductById(productToDelete);
    //             res.status(200).json(product);}
    //     }
        
    //     res.status(200).json(product);
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    // }


}
