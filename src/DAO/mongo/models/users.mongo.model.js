import mongoose from "mongoose";

const usersCollections = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true
},
  social: String,
  age: Number,
  password: String,
  rol: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cart:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'carts'
  },
  ticket: {type: mongoose.Schema.Types.ObjectId, ref: "tickets"}
});

mongoose.set("strictQuery", false);

const UserModel = mongoose.model(usersCollections, userSchema);

export default UserModel;