import CategoryModel from "./models/category.mongo.model.js";

export default class CategorysMongo {
  async addCategory(data) {
    try {
      return await CategoryModel.create(data);
    } catch (error) {
      throw error;
    }
  }
  async getCategorys() {
    try {
      return await CategoryModel.find().lean().exec();
    } catch (error) {
      throw error;
    }
  }
  async getCategoryById(id) {
    try {
      return await CategoryModel.findById(id).lean().exec();
    } catch (error) {
      throw error;
    }
  }
  async updateCategory(id, data) {
    try {
      const category = await CategoryModel.findById(id);
      if (!category) null;
      CategoryModel.updateOne({ _id: id }, data);
    } catch (e) {
      throw e;
    }
  }
  async deleteCategory(id) {
    try {
      const category = await CategoryModel.findById(id);
      if (!category) return null;
      CategoryModel.deleteOne({ _id: id });
    } catch (e) {
      throw e;
    }
  }
  async getCategoryPaginate(page, limit) {
    try {
      const category = await CategoryModel.paginate(
        {},
        { page: page || 1, limit: limit || 50, lean: true }
      );
      return category;
    } catch (e) {
      throw e;
    }
  }
}
