// products.mongo.js
import ProductsModel from './models/products.mongo.model.js';

export default class ProductsMongo {
  create = async(productData) => {
    return await ProductsModel.create(productData);
  }

  delete = async (productId) => {
    return await ProductsModel.findByIdAndDelete(productId);
  }

  findProductByCode = async (productCode) => {
    return await ProductsModel.findOne({ code: productCode });
  }

  findProductById = async (productId) => {
    return await ProductsModel.findById(productId);
  }

  update = async (productId, updatedFields) => {
    return await ProductsModel.findByIdAndUpdate(productId, updatedFields, { new: true });
  }
  getProducts = async (limit, page, sort, status) => {
    try{
        switch (status) {
            case 'true':
                status = {status: true}
                break;
            case 'false':
                status = {status: false}
                break;
            default:
                status = {}
                break;
        }
        let options = {
            limit, 
            page, 
            lean: true
        }
        if(sort){
            let options = {
                limit, 
                page, 
                sort:{
                    price: sort
                },
                lean: true
            }
            console.log(status)
            const products = await ProductsModel.paginate(status, options)
            products.prevLink = products.hasPrevPage? `/products?page=${products.prevPage}&limit=${limit}&sort=${sort}&status=${status}` : ''
            products.nextLink = products.hasNextPage? `/products?page=${products.nextPage}&limit=${limit}&sort=${sort}&status=${status}` : ''
            return products
        }
        const products = await ProductsModel.paginate(status, options)
        products.prevLink = products.hasPrevPage? `/products?page=${products.prevPage}&limit=${limit}${status}` : ''
        products.nextLink = products.hasNextPage? `/products?page=${products.nextPage}&limit=${limit}${status}` : ''
        return products

    }catch(e){
        return console.error(e)
    }
}


}
