import { Router } from 'express'
import ProductModel from '../DAO/mongoManager/models/product.model.js'
 
const router = Router()

router.get('/', async (req, res) => {
    const result = await ProductModel.find()
    res.send(result)
})

router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const result = await ProductModel.findById(pid);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  }); 

  router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedParams = req.body;
    console.log("Product ID:", pid);
    console.log("Updated Params:", updatedParams);
    try {
      const result = await ProductModel.findByIdAndUpdate(
        pid,
        updatedParams,
        { new: true } // This option returns the updated document
      );
      console.log("Updated Product:", result);
      res.send(result);
      console.log('Product updated successfully');
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  


router.post('/', async (req, res) => {
    const data = req.body
    
    const result = await ProductModel.create(data)

    res.send(result)
})

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    if (!pid) {
      return res.status(404).send({ message: "Product not found" });
    }
    try {
      const result = await ProductModel.findByIdAndRemove(pid);
      if (result) {
        res.send({ message: "Product deleted successfully" });
        console.log("Product deleted successfully");
      } else {
        res.status(500).send({ message: "Failed to delete product" });
        console.log("Failed to delete product");
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
      console.log("Error deleting product");
    }
  });

export default router
