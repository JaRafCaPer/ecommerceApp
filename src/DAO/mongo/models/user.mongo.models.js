import mongoose, { Mongoose } from "mongoose";

const userModel = mongoose.model(
  "users",
  new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: String,
    password: String,
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    rol: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  })
);

export default userModel;
