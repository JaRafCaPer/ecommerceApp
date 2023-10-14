import { Server } from "socket.io";
import { createProduct, deleteProductById, getProducts } from "../../controllers/product.controllers.js";
import { saveMessage, getMessages } from "../../controllers/messages.controllers.js";


  function initializeSocketIO(httpServer) {
    const io = new Server(httpServer);
  
    io.on("connection", (socket) => {
      console.log("Client connected successfully");
      socket.on("new-product", async (data) => {
        
        try {
          const newProduct = data;
          console.log ("newProduct:", newProduct)
          await createProduct(newProduct);
          const products = await getProducts();
          io.emit("reload-table", products);
        } catch (e) {
          console.log(e);
        }
      });
  
      socket.on("delete-product", async (id) => {
        try {
          await deleteProductById(id);
          const products = await getProducts();
          io.emit("reload-table", products);
        } catch (e) {
          console.log(e);
        }
      });
  
      socket.on("message", async (data) => {
        await saveMessage(data);
        const messages = await getMessages();
        io.emit("messages", messages);
      });
  
      socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
      });
    });
  }
  
export default initializeSocketIO;
  