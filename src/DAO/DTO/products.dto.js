export default class ProductDTO {

    constructor(product) {
        this.name = product?.name ?? 'NN'
        this.image = product?.image ?? ''
        this.description = product?.description ?? 'No Description' 
        this.category = product?.category ?? 'generic' 
        this.price = product?.price ?? 0 
        this.status = product?.status ?? true 
        this.stock = product?.stock ?? 0 
    }
}