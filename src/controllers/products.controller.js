import { productService } from "../services/index.js";

export const createProduct = async (request, response) => {
  try {
    const newProduct = await productService.createNewProduct(request.body);
    response.status(201).json(newProduct);
  } catch (err) {
    response.status(500).json({ error: 'Error al crear el producto' });
  }
};

export const deleteProduct = async (request, response) => {
  console.log("Intentando eliminar producto"); 
  try {
    const { pid } = request.params;
    console.log("ID del producto a eliminar:", pid);
    await productService.deleteExistingProduct(pid);
    response.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (err) {
    console.log("Error al eliminar el producto:", err);
    response.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

export const updateProduct = async (request, response) => {
  try {
    const { pid } = request.params;
    const updatedProduct = await productService.updateExistingProduct(pid, request.body);
    response.status(200).json(updatedProduct);
  } catch (err) {
    response.status(500).json({ error: 'Error al actualizar el producto' });
  }
};