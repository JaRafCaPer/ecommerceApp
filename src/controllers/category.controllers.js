import { categoryRepository } from "../services/index.js";
export const getCategories = async (req, res) => {
  try {
    const categories = await categoryRepository.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const category = await categoryRepository.getCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const addCategory = async (req, res) => {
  try {
    const category = await categoryRepository.addCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const category = await categoryRepository.updateCategory(
      req.params.id,
      req.body
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
