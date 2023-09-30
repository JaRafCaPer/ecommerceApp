import FileManager from "./file.manager.js";
import Product from "./products.file.js";
import CartDTO from "../DTO/carts.dto.js";

export default class CartManager extends FileManager{
    constructor(filename = './db.users.json') {
        super(filename)
        this.productFile = new Product()
    }
    createCart = async (array={}) => {
        const newCart = new CartDTO(array)
        return await this.add(newCart)
    }
    getCarts = async (populate = false) => {
        const carts = await this.get()
        if(populate){
            const products = await this.productFile.getProducts()
            for (let i = 0; i < carts.length; i++) {
                const result = []
                const cartProducts = carts[i].products
                cartProducts.forEach((prodId)=>{
                    let prod = products.find(prod => parseInt(prod._id) == parseInt(prodId.product))
                    result.push(prod)
                })
                carts[i].products = result
                
            }
        }
        return carts

    }
    getCartById = async (populate = false, id) => {
        const cart = await this.getById(id)
        if(populate){
            const products = await this.productFile.getProducts()
            const result = []

            cart.products.forEach(product=>{
                let prod = products.find(prod=> parseInt(prod._id) == parseInt(product.product))
                result.push(prod)
            })
            cart.products = result
            console.log(result)
        }
        return cart
    }
    addProduct = async (cartId, prodId) =>  {
        const prod = await this.productFile.getProductById(prodId)
        const cart = await this.getById(cartId)
        let quantity = 1
        if(cart && prod){
            cart.products.push({product: prod._id, quantity: quantity})
            return await this.update(cartId, cart)
        }else{
            throw new Error('Product not added')
        }

    }
    updateCart = async (id, cart) => {
        return await this.update(id, cart)
    }
}