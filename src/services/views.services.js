import mongoose from 'mongoose';
import ProductsModel from "../DAO/mongo/models/products.mongo.model.js";
import CartsModel from "../DAO/mongo/models/carts.mongo.model.js"
import MessagesModel from "../DAO/mongo/models/message.mongo.model.js";



export const getProducts = async () => {
  try {
    const products = await ProductsModel.find().lean().exec();
    if (!products || products.length === 0) {
      console.warn("No se encontraron productos en la base de datos.");
    }
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const getPaginatedProducts = async (limit, page, sort, status) =>{
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
export const getCategories = async () => {
  try {
    const categories = await ProductsModel.distinct('category').lean().exec();
    if (!categories || categories.length === 0) {
      console.warn("No se encontraron categorías en la base de datos.");
    }
    return categories;
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    throw error;
  }
};



export const getList = async (request) => {
    let page = parseInt(request.query?.page || 1);
    let limit = parseInt(request.query?.limit || 10);
    const queryParams = request.query?.query || '';
    const sortParam = request.query?.sort || '';
  
    const query = {};
    if (queryParams) {
      const field = queryParams.split(',')[0];
      let value = queryParams.split(',')[1];
  
      if (!isNaN(parseInt(value))) value = parseInt(value);
      query[field] = value;
    }
  
    const sort = {};
    if (sortParam === 'asc' || sortParam === 'desc') {
      sort['price'] = sortParam === 'asc' ? 1 : -1;
    }
  
    const totalDocs = await ProductsModel.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);
  
    if (page > totalPages) {
      page = totalPages;
    }
  
    const result = await ProductsModel.find(query).sort(sort).skip((page - 1) * limit).limit(limit).lean();
  
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevLink = hasPrevPage ? `/list?limit=${limit}&page=${page - 1}` : null;
    const nextLink = hasNextPage ? `/list?limit=${limit}&page=${page + 1}` : null;
  
    return {
      status: 'success',
      payload: result,
      totalPages,
      prevPage: page - 1,
      nextPage: page + 1,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    };
  };                  
  
  export const getProductsByID = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid id: ', id);
      return null;
    }
    console.log('paso el id de mongo')
    const pid = id
    console.log('id antes del findbyid', pid)
    return await ProductsModel.findById(pid).lean().exec();
  };
  
  export const getChat = async () => {
    return await MessagesModel.find().lean().exec();
  };
  
  export const getCarts = async () => {
    return await CartsModel.find().populate('products.products').lean().exec();
  };
  
  export const getCartByID = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await CartsModel.findById(id).populate('products.products').lean().exec();
  };