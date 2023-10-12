import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      pid: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ["abierto", "cerrado"],
    default: "abierto",
  },
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
