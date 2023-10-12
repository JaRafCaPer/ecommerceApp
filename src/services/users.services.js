import UserDTO from "../DTO/user.dto.js";

export default class UserService {
  constructor(userDAO, cartDAO) {
    this.userDAO = userDAO;
    this.cartDAO = cartDAO;
  }
  async createUser(user) {
    try {
      const userAdded = await this.userDAO.createUser(user);
      console.log("userAdded user service", userAdded);
      return userAdded;
    } catch (error) {
      throw error;
    }
  }
  async getUserById(id) {
    try {
      const user = await this.userDAO.getUserById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUsers() {
    try {
      const users = await this.userDAO.getUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(id, user) {
    try {
      const userUpdated = await this.userDAO.updateUser(id, user);
      return new UserDTO(userUpdated);
    } catch (error) {
      throw error;
    }
  }
    async deleteUser(id) {
        try {
        const userDeleted = await this.userDAO.deleteUser(id);
        return new UserDTO(userDeleted);
        } catch (error) {
        throw error;
        }
    }
    async getUserByEmail(email) {
        try {
        const user = await this.userDAO.getUserByEmail(email);
        return user;
        } catch (error) {
        throw error;
        }
    }
}
