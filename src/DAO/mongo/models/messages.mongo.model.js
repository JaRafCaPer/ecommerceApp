import mongoose from "mongoose";

const messageModel = mongoose.model('messages', new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }}))



export default messageModel;