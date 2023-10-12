import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js";
import ProductsMongo from "./DAO/mongo/products.mongo.js";

import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import viewsRoutes from "./routes/view.routes.js";
import sessionRoutes from "./routes/session.routes.js";

const PORT = config.PORT;
const PERSISTENCE = config.PERSISTENCE;
const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.MONGO_URI,
      dbName: config.DB_NAME,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 140000000000000000000,
    }),
    secret: "CoderSecret",
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser("keyCookieForJWT"));

app.use("/", viewsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/chat", chatRoutes);

const runServer = () => {
  const productMongo = new ProductsMongo();
  const httpServer = app.listen(
    PORT,
    console.log(`✅Server listening in the port: ${PORT}`),
    PERSISTENCE,
    console.log(`✅Persistence: ${PERSISTENCE}`)
  );
  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log("Client connected succesly");
    socket.on("new-product", async (data) => {
      try {
        await productMongo.addProduct(data);
        const products = await productMongo.getProducts();
        io.emit("reload-table", products);
      } catch (e) {
        console.log(e);
      }
    });
    socket.on("delete-product", async (id) => {
      try {
        await productMongo.deleteProduct(id);
        const products = await productMongo.getProducts();
        io.emit("reload-table", products);
      } catch (e) {
        console.log(e);
      }
    });
    socket.on("message", async (data) => {
      await messageRepository.saveMessage(data);
      //Envia el back
      const messages = await messageRepository.getMessages();
      io.emit("messages", messages);
    });
    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};

runServer();
