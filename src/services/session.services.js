import UserDTO from "../DTO/user.dto.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateUserErrorInfo } from "../errors/info.js";

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
        CustomError.createError({
          name: "Error",
          message: "User not found",
          code: EErrors.USER_NOT_EXISTS,
          info: generateUserErrorInfo(user),
        });
      }
      if (!isValidPassword(user, password)) {
        CustomError.createError({
          name: "Error",
          message: "Password not valid",
          code: EErrors.PASSWORD_NOT_VALID,
          info: generateUserErrorInfo(user),
        })
      }
      return new UserDTO(user);
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "User not found",
        code: EErrors.USER_NOT_EXISTS,
        info: generateUserErrorInfo(user),
      });
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
      CustomError.createError({
        name: "Error",
        message: "User not registered",
        code: EErrors.USER_NOT_REGISTERED,
        info: generateUserErrorInfo(user),
      });
    }
  }

  async getUserCurrent(user) {
    try {
      const userCurrent = new UserDTO(user.user);
      return userCurrent;
    }
    catch(error){
      CustomError.createError({
        name: "Error",
        message: "User not found",
        code: EErrors.USER_NOT_FOUND,
        info: generateUserErrorInfo(user),
      });
    }
    
    
    
  }
}
