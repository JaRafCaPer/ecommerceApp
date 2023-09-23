// cart.repository.js

import CartDTO from "../DAO/DTO/carts.dto.js"; // Import the CartDTO

export default class CartRepository {

    constructor(dao) {
        this.dao = dao;
    }

    getAllCarts = async () => { return await this.dao.getAllCarts(); }
    
    getCartById = async (cid) => { return await this.dao.getCartById(cid); }

    createCart = async () => { 
        const cartToInsert = new CartDTO();
        return await this.dao.createCart(cartToInsert);
    }
    
    addProductsToCart = async (cid, productsToAdd) => {
        const cart = await this.dao.getCartById(cid);
        
        for (const productToAdd of productsToAdd) {
            const existingProductIndex = cart.products.findIndex(item => item.item.toString() === productToAdd.item);

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += productToAdd.quantity;
            } else {
                cart.products.push({ item: productToAdd.item, quantity: productToAdd.quantity });
            }
        }
        
        return await this.dao.updateCart(cid, cart);
    }
}
