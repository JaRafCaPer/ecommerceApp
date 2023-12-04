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
    status: {
      type: "String",
      enum: ["verified", "not verified"],
      default: "not verified",
    },
    verificationCode: String,
    documents: [
      {
        profile: {
          name: {
            type: String,
            default: null,
          },
          reference: {
            type: String,
            default: null,
          },
        },
        products: {
          name: {
            type: String,
            default: null,
          },
          reference: {
            type: String,
            default: null,
          },
        },
        documents:[{ 
          identification: {
          name: {
            type: String,
            default: null,
          },
          reference: {
            type: String,
            default: null,
          },
        },
        state: {
          name: {
            type: String,
            default: null,
          },
          reference: {
            type: String,
            default: null,
          },
        },
        address: {
          name: {
            type: String,
            default: null,
          },
          reference: {
            type: String,
            default: null,
          }}
        }
          ],
      },
    ],
    lastConnection: 
      {
        type: Date,
        default: null,
      },
    rol: {
      type: String,
      enum: ["user", "admin","premium"],
      default: "user",}
  })
);

export default userModel;
