import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: String,
    description: String,
    category: String,
    price: Number,
    status: String,
    stock: Number,
    code:Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }

})

productsSchema.plugin(mongoosePaginate)

mongoose.set(`strictQuery`,false)

const ProductsModel = mongoose.model('products',productsSchema)


export default ProductsModel


