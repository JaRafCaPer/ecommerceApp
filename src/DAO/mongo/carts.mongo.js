import CartsModel from './models/carts.mongo.model.js';

export default class CartsMongo {

   async getCarts(query = {}) {
    return await CartsModel.find(query);
  }

 
   async getCartByID(cid) {
    const cart = await CartsModel.findById(cid).populate('products.productId').lean().exec();
    console.log(cart.products)
    return cart
  }

  
   async createNewCart() {
    return await CartsModel.create({ products: [] });
  }

  
   async updateCart(cid, cart) {
    return await CartsModel.updateOne({ _id: cid }, { $set: cart });
  }
}
