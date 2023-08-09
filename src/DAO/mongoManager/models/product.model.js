import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: String,
  description: String,
  category: String,
  price: Number,
  status: String,
  stock: Number,
});

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model('products', productSchema);

export default ProductModel;


