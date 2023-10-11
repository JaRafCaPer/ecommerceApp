import { createHash, isValidPassword } from "../utils.js";
import UserDTO from "../DTO/user.dto.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateUserErrorInfo } from "../errors/info.js";



export default class SessionRepository {
  constructor(userDAO) {
    this.userDAO = userDAO;
  }

  async loginUser(user) {
    try {
      console.log(user.email);
      const userDB = await this.userDAO.getUserByEmail(user.email);
      console.log(userDB);
      if (!userDB) {
        CustomError.createError({
          name: "Error",
          message: "User not found by create error",
          code: EErrors.USER_NOT_FOUND,
          info: generateUserErrorInfo(user),
        })
      }
      if (!isValidPassword(userDB, user.password)){
        CustomError.createError({
          name: "Error",
          message: "Password not valid",
          code: EErrors.PASSWORD_NOT_VALID,
          info: generateUserErrorInfo(user),
        })
      }
      return new UserDTO(userDB);
    } catch (e) {
      throw e;
    }
  }

  async registerUser(user) {
    if(await this.userDAO.getUserByEmail(user.email)) throw new Error("User already exist")
    console.log(user)
    user.password = createHash(user.password);
    if (user.email === "adminCoder@coder.com") {
      user.rol = "admin";
    } else {
      user.rol = "user";
    }
    return await this.userDAO.createUser(user);
  }

  async getUserCurrent(user) {
    console.log(new UserDTO(user))
    return new UserDTO(user);
  }
}
