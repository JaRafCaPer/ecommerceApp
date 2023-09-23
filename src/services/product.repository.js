import ProductDTO from "../DAO/DTO/products.dto.js";

export default class ProductRepository {

    constructor(dao) {
        this.dao = dao
    }

    getProducts = async () => { return await this.dao.getProducts() }
    getProductById = async(pid) => { return await this.dao.getProductById(pid) }
    createProduct = async(store) => { 
        const ProductToInsert = new ProductDTO(store)
        return await this.dao.createProduct(ProductToInsert)
    }
}