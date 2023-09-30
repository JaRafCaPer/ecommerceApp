import FileManager from "./file.manager.js"

export default class Product extends FileManager {
    constructor(filename = './db.products.json') {
        super(filename)
    }

     getProducts = async () => {
        return await this.get()
    }

     getProductById = async (id)=> {
        return await this.getById(id)
    }

     addProductToDatabase = async (product) => {
        return await this.add(product)
    }

     updateProduct = async (id, data) => {
        return await this.update(id, data)
    }
}
   
