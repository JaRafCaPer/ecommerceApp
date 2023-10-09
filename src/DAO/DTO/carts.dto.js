export default class CartDTO {
    constructor(cart) {
        //manera con el throw // el evento every devuelve boleano :;: true 
      if (!Array.isArray(cart?.products) || !cart.products.every(p => p.products && p.quantity)) {
        throw new Error("Los productos son requeridos y deben tener una cantidad asociada.");
      }
      this.products = cart.products;
    }
  }
  