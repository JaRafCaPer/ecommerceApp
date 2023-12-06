import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const ticketSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  purchase_datetime: {
    type: String,
    required: true,
  },
  products: [
    {
      pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      title: String,
      code: String,
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
  purchase_status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
});

const ticketCollection = "tickets";

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;
