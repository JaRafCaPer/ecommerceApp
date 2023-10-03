import CartModel from "./models/carts.mongo.model.js";
import ProductsModel from './models/products.mongo.model.js'
import ProductManager from "./products.mongo.js";
export default class CartManager{
    constructor(){
        this.productManager = new ProductManager()
    }
    async createCart(array){
        try {
            
            const cart = await CartModel.create(array)
            return cart
        } catch (e) {
            return console.error(e)
        }
    }

    async getAllCarts(populate = false){
        try{
            if(populate){
                const getCarts = await CartModel.find().populate('products.product').lean().exec()
                return getCarts
            }
            const getCarts = await CartModel.find().lean().exec()
            return getCarts
        }catch(e){
            return console.error(e)
        }
    }

    async getCartById(id, populate = false) {
        try {
            if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{24}$/.test(id)) {
                throw new Error('Invalid cart ID');
            }
    
            if (populate) {
                const cart = await CartModel.findById(id).populate('products.product').lean().exec();
                if (!cart) {
                    throw new Error('The cart does not exist');
                }
                return cart;
            }
            
    
            const cart = await CartModel.findById(id);
            if (!cart) {
                throw new Error('The cart does not exist');
            }
            return cart;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    
    
    async deleteCart(id){
        try {
            const deletedCart = await CartModel.deleteOne({_id: id})
            if(!deletedCart) throw new Error('Error: cart does not exist')
            return deletedCart
            
        } catch (error) {
            return console.error(error)
        }
    }

    async updateCart(cId, products){
        try {
            const prod = await CartModel.findByIdAndUpdate({_id: cId}, {$set: {products: products}})
            console.log(prod)
            return prod
        } catch (error) {
            return console.error(error)
        }
    }
    async addProductToCart(cId, pId){        
        try {
            const cart = await this.getCartById(cId, false)
            const product = await ProductsModel.findById(pId)
            cart.products.push({product: product._id, quantity: 1})
            await cart.save()
            return cart

        } catch (error) {
            return console.error(error)
        }
    }

}