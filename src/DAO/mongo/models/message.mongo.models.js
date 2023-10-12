import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const messageCollection = "messages";

const ChatModel = mongoose.model(
  messageCollection,
  new mongoose.Schema({
    user: String,
    message: String,
    hour: String,
  })
);

export default ChatModel;