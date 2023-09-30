export default class CartDTO{

    constructor(cart){
        this.products = [
            this.product = cart?.product,
            this.quantity = cart?.quantity
        ] = cart?.products ?? []
    }

}