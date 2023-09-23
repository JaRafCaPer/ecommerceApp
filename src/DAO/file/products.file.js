import FileManager from "./file.manager.js"

export default class Product extends FileManager {
    constructor(filename = './db.products.json') {
        super(filename)
    }

    getProducts = async () => { return await this.get() }
    getProductById = async (id) => { return await this.getById(id) }
    createProduct = async (Product) => { return await this.add(Product) }
    updateProduct = async (id, Product) => {
        Product.id = id
        return await this.update(Product)
    }
}