import CartDTO from '../DAO/DTO/carts.dto.js'
import {cartService, productService, ticketService} from './index.js'



export default class CartRepository{
    //DAO es la variable que recibimos desde el factory
    constructor(dao){
        this.dao = dao

    }

    async createCart(array){
        const cartToInsert = new CartDTO(array)
        return await this.dao.createCart(cartToInsert)
    }
    async getAllCarts(populate = false){
        return await this.dao.getAllCarts(populate)
    }
    async getCartById(populate = false, id){
        return await this.dao.getCartById(populate, id)
    }
    async updateCart(cId, products){
        return await this.dao.updateCart(cId, products)
    }
    async clearCart(id){
        const cart = await this.dao.getCartById(id)
        cart.products = []
        await this.dao.updateCart(id, cart.products)
        // await cart.save()
        return cart
    }
    async addProductToCart(cId, pId) {
        try {
            const cart = await this.dao.getCartById(cId);
            const getProduct = await productService.getProductById(pId);
    
            // Check if the product is already in the cart
            const isRepeated = cart.products?.find(prod => {
                if (prod.product?._id) {
                    return prod.product?._id.toString() === getProduct._id.toString();
                } else {
                    return prod?.product === getProduct._id;
                }
            });
    
            if (!isRepeated) {
                // Product is not in the cart, add it
                return await this.dao.addProductToCart(cId, pId);
            } else {
                // Product is already in the cart, increment quantity
                isRepeated.quantity++;
    
                // Update the cart with the modified product
                return await this.dao.updateCart(cart._id, isRepeated);
            }
        } catch (error) {
            // Handle any errors that occur during database operations
            console.error("Error adding product to cart:", error);
            throw error; // Optionally re-throw the error for higher-level error handling
        }
    }
    
    async deleteProductFromCart(cId, pId) {
        try {
            // Fetch the cart and product
            const cart = await this.dao.getCartById(cId);
            const product = await productService.getProductById(pId);
    
            // Check if the product is in the cart
            const isInCart = cart.products.find(prod => {
                if (prod.product._id) {
                    return prod.product._id === product._id;
                } else {
                    console.log(prod.product === product._id);
                    return prod.product === product._id;
                }
            });
    
            if (isInCart) {
                if (isInCart.quantity > 1) {
                    // Decrement the quantity
                    isInCart.quantity -= 1;
                } else {
                    // Remove the product from the cart
                    const cartFilter = cart.products.filter(prod => prod.product !== isInCart.product);
                    cart.products = cartFilter;
                }
    
                // Update the cart
                return await this.dao.updateCart(cart._id, cart);
            }
        } catch (error) {
            // Handle any errors that occur during database operations
            console.error("Error deleting product from cart:", error);
            throw error; // Optionally re-throw the error for higher-level error handling
        }
    }
    
    async deleteCart(cId){
        return await this.dao.deleteCart(cId)
    }

    async updateQuantityFromCart(cId, pId){
        return await this.dao.updateQuantityFromCart(cId, pId)
    }

    async purchaseProducts(cId, email) {
        try {
            const cartPopulated = await this.dao.getCartById(true, cId);
            console.log(cartPopulated);
    
            let totalPrice = 0;
            const productsNotProcessed = [];
    
            for (const prod of cartPopulated.products) {
                if (prod.product.stock < prod.quantity) {
                    const quantityProductsNotPurchased = prod.quantity - prod.product.stock;
                    productsNotProcessed.push({ product: prod.product._id, quantity: quantityProductsNotPurchased });
    
                    if (prod.product.stock !== 0) {
                        console.log('Supuestamente no tengo 0 stock, ' + prod.product.stock);
                        totalPrice += prod.product.price * prod.product.stock;
                    }
    
                    // Set product stock to 0
                    prod.product.stock = 0;
                } else {
                    prod.product.stock -= prod.quantity;
                    totalPrice += prod.product.price * prod.quantity;
                }
    
                // Update product stock
                await productService.updateProduct(prod.product._id, prod.product);
            }
    
            // Update the cart with productsNotProcessed
            const resultCart = await cartService.updateCart(cId, productsNotProcessed);
            console.log(resultCart);
    
            // Create a ticket
            const ticket = await ticketService.createTicket(totalPrice, email);
            console.log(ticket);
    
            return ticket;
        } catch (error) {
            // Handle any errors that occur during the purchase process
            console.error("Error purchasing products:", error);
            throw error; // Optionally re-throw the error for higher-level error handling
        }
    }
    
    
} 