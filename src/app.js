import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import initializeSocketIO from "./public/js/sokets.js";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import initializePassport from "./config/passport.config.js";
import { addLogger } from "./loggers/logger.js";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import viewsRoutes from "./routes/view.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import userRoutes from "./routes/user.routes.js";
import paymentsRoutes from "./routes/payments.routes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express'

const swaggerOptions = {
    definition:{
      openapi: '3.0.1',
      info:{
          title: 'Documentation for eshop',
          description: 'Is a back-end for an ecommerce project',
      }
    },
      apis: [`${__dirname}/docs/**/*.yaml`]
   
}

const PORT = config.PORT;
const PERSISTENCE = config.PERSISTENCE;
const app = express();
 
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(addLogger)
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

const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs))

app.use("/", viewsRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users",userRoutes);
app.use("/api/payments", paymentsRoutes)

const runServer = () => {
 
  const httpServer = app.listen(
    PORT,
    console.log(`✅Server listening in the port: ${PORT}`),
    PERSISTENCE,
    console.log(`✅Persistence: ${PERSISTENCE}`)
  );
  initializeSocketIO(httpServer);

};

runServer();
