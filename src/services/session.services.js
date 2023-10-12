import UserDTO from "../DTO/user.dto.js";

import { isValidPassword, createHash } from "../utils.js";

export default class SessionService {
  constructor(userDAO) {
    this.userDAO = userDAO;
  }
  async loginUser(req) {
    try {
      const email = req.email;
      const password = req.password;
      console.log(email);
      const user = await this.userDAO.getUserByEmail(email);
      console.log('user in service', user);
      if (!user) {
        throw new Error("User not found");
      }
      if (!isValidPassword(user, password)) {
        throw new Error("Incorrect password");
      }
      return new UserDTO(user);
    } catch (error) {
      throw error;
    }
  }

  async registerUser(user) {
    try {
     const userFromController = user;
      console.log("user in session service from controller", userFromController);
      if (await this.userDAO.getUserByEmail(userFromController.email)) {
        throw new Error("Email already registered");
      }
      userFromController.password = createHash(userFromController.password);
      if (userFromController.email === "adminCoder@coder.com") {
        userFromController.rol = "admin";
      } else {
        userFromController.rol = "user";
      }
      const userRegister = await this.userDAO.createUser(userFromController);
      console.log("user in session service", userRegister);
      
      return new UserDTO(userRegister);
    } catch (error) {
      throw error;
    }
  }

  async getUserCurrent(user) {
    console.log("user current in session service", user);
    const userCurrent = new UserDTO(user.user);
    console.log("user current in session service", userCurrent);
    return userCurrent;
    
  }
}
