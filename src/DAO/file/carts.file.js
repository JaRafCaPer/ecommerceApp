import FileManager from "./file.manager.js"

export default class Cart extends FileManager {
    constructor(filename = './db.products.json') {
        super(filename)
    }

    getCarts = async () => { return await this.get() }
    getCartById = async (id) => { return await this.getById(id) }
    createCart = async (Cart) => { return await this.add(Cart) }
   
}