import mongoose from 'mongoose';
import config from '../config/config.js';

export async function connectMongo() {
  try {
    await mongoose.connect(config.MONGO_URI, {
      dbName: config.DB_NAME,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("DB conectada");
  } catch (err) {
    console.log("No se pudo conectar a la base de datos");
  }
}

export let Carts;
export let User;
export let Products;
export let Messages;
export let Tickets;

console.log(`Persistence with ${config.PERSISTENCE}`);

switch (config.PERSISTENCE) {
  case "MONGO":
    await connectMongo();

    const { default: CartsMongo } = await import("./mongo/carts.mongo.js");
    const { default: UserMongo } = await import("../DAO/mongo/user.mongo.js");
    const { default: ProductsMongo } = await import("../DAO/mongo/products.mongo.js");
    const { default: MessagesMongo } = await import("../DAO/mongo/messages.mongo.js");
    const { default: TicketsMongo } = await import("../DAO/mongo/ticket.mongo.js");

    Carts = CartsMongo;
    User = UserMongo;
    Products = ProductsMongo;
    Messages = MessagesMongo;
    Tickets = TicketsMongo;
    break;

  case 'FILE':
    const { default: UserFile } = await import('./file/user.file.js');
    const { default: CartsFile } = await import('./file/carts.file.js');
    const { default: ProductsFile } = await import('./file/products.file.js');
    const { default: MessagesFile } = await import('./file/messages.file.js');
    const { default: TicketsFile } = await import('./file/ticket.file.js');

    User = UserFile;
    Carts = CartsFile;
    Products = ProductsFile;
    Messages = MessagesFile;
    Tickets = TicketsFile;
    break;

  default:
    console.log("No se eligió una opción de persistencia válida.");
    break;
}
