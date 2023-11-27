import { Server } from "socket.io";
import { createProduct, deleteProductById, getProducts } from "../../controllers/product.controllers.js";
import MessageService from "../../services/messages.services.js";
import { messageService } from "../../services/index.js";


  function initializeSocketIO(httpServer) {
    console.log("Initializing socket.io");
    const io = new Server(httpServer);
  
    io.on("connection", (socket) => {
      console.log("Client connected successfully");
      socket.on("new-product", async (data) => {
        
        try {
          const newProduct = data;
         
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
  
      socket.on("new-message", async (data) => {
        try {
            const { user, message } = data;
            const newMessage = { user, message };
            await messageService.saveMessage(newMessage);
        } catch (error) {
            console.error("Error al guardar el mensaje:", error);
        }

        io.emit("message-received", data);
    });
  
      socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
      });
    });
    console.log("Socket.io initialized");
  }
  
export default initializeSocketIO;
  