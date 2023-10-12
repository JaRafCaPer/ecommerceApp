import config from "../config/config.js";

import mongoose from "mongoose";

export let Product;
export let Cart;
export let User;
export let Ticket;
export let Message;

switch (config.PERSISTENCE) {
  case "MONGO":
    mongoose
      .connect(config.MONGO_URI, {
        dbName: config.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.log(err));

    const { default: ProductMongo } = await import("./mongo/products.mongo.js");
    const { default: CartMongo } = await import("./mongo/carts.mongo.js");
    const { default: UserMongo } = await import("./mongo/users.mongo.js");
    const { default: TicketMongo } = await import("./mongo/tickets.mongo.js");
    const { default: MessageMongo } = await import("./mongo/messages.mongo.js");

    Product = ProductMongo;
    Cart = CartMongo;
    User = UserMongo;
    Ticket = TicketMongo;
    Message = MessageMongo;

    break;
    case 'FILE':
        const {default: ProductFile} = await import('./file/products.file.js')
        const {default: CartFile} = await import('./file/carts.file.js')
        const {default: TicketFile} = await import('./file/tickets.file.js')
        const {default: UserFile} = await import('./file/user.file.js')
        const {default: MessageFile} = await import('./file/messages.file.js')
        Cart = CartFile
        Product = ProductFile
        User = UserFile
        Ticket = TicketFile
        Message = MessageFile
        break;
}
