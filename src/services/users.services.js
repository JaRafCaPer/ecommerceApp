import UserDTO from "../DTO/user.dto.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateUserErrorInfo } from "../errors/info.js";

export default class UserService {
  constructor(userDAO, cartDAO) {
    this.userDAO = userDAO;
    this.cartDAO = cartDAO;
  }
  async createUser(user) {
    try {
      console.log("user", user);
      const userAdded = await this.userDAO.createUser(user);
      return userAdded;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "User not added",
        code: EErrors.USER_NOT_ADDED,
        info: generateUserErrorInfo(user),
      });
    }
  }
  async getUserById(id) {
    try {
      const user = await this.userDAO.getUserById(id);
      if (!user) {
        CustomError.createError({
          name: "Error",
          message: "User not exists",
          code: EErrors.USER_NOT_EXISTS,
          info: generateUserErrorInfo(product),
        });
      }
      return user;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "User not found",
        code: EErrors.USER_NOT_FOUND,
        info: generateUserErrorInfo(user),
      });
    }
  }
  async getUsers() {
    try {
      const users = await this.userDAO.getUsers();
      return new UserDTO(users);
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Users not found",
        code: EErrors.USERS_NOT_FOUND,
        info: generateUserErrorInfo(users),
      });
    }
  }
  async updateUser(id, user) {
    try {
     
      const userUpdated = await this.userDAO.updateUser(id, user);
      return userUpdated;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "User not updated",
        code: EErrors.USER_NOT_UPDATED,
        info: generateUserErrorInfo(user),
      });
    }
  }
    async deleteUser(id) {
        try {
        const userDeleted = await this.userDAO.deleteUser(id);
        return new UserDTO(userDeleted);
        } catch (error) {
        CustomError.createError({
            name: "Error",
            message: "User not deleted",
            code: EErrors.USER_NOT_DELETED,
            info: generateUserErrorInfo(user),
        });
        }
    }
    async uploadDocuments(id, files){
      const user = await this.dao.getUserById(id)
      const profileFiles = files?.profile
      const productsFiles = files?.products
      const documentsFiles = files?.documents
      productsFiles?.forEach(products=> user.documents.push({name: products.filename, reference: products.path}))
      profileFiles?.forEach(p => user.documents.push({name: p.filename, reference: p.path}))
      documentsFiles?.forEach(d => user.documents.push({name: d.filename, reference: d.path}))
      const updatedUser = await this.dao.updateUser(user.id, user)
      return updatedUser

  }
    async getUserByEmail(email) {
        try {
          console.log("email", email);
        const user = await this.userDAO.getUserByEmail(email);
        if (!user) {
            console.log("User not found");
        }
        return user;
        } catch (error) {
        CustomError.createError({
            name: "Error",
            message: "User not found",
            code: EErrors.USER_NOT_FOUND,
            info: generateUserErrorInfo(user),
        });
        }
    }
}
