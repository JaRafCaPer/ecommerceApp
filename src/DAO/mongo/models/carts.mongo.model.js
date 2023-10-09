import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  status: {
    type: String,
    enum: ['abierto', 'cerrado'],
    default: 'abierto'
  }
});
cartSchema.plugin(mongoosePaginate);
const cartsModel = mongoose.model('carts', cartSchema);

export default cartsModel;