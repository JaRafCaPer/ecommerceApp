import UserDTO from "../DTO/user.dto.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateUserErrorInfo } from "../errors/info.js";
import nodemailer from "nodemailer";
import { isValidPassword, createHash } from "../utils.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "gmail",
  
  auth: {
    user: config.USER,
    pass: config.PASS,
  },
});

export default class SessionService {
  constructor(userDAO, tokenDAO, ticketDAO) {
    this.userDAO = userDAO;
    this.tokenDAO = tokenDAO;
    this.ticketDAO = ticketDAO;
  }
  async loginUser(req) {
    try {
      const email = req.email;
      const password = req.password;
     
      const user = await this.userDAO.getUserByEmail(email);
   
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
      return user;
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

  async getUserByEmail(email) {
    try {
      const user = await this.userDAO.getUserByEmail(email);
      if (!user) {
        CustomError.createError({
          name: "Error",
          message: "User not found by create error",
          code: EErrors.USER_NOT_FOUND,
          info: generateUserErrorInfo(user),
        });
      }
      return user;
    } catch (e) {
      throw e;
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

  async findToken(token) {
    try {
      const tokenFound = await this.userDAO.getToken(token);
   
      return tokenFound;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Token not found",
        code: EErrors.TOKEN_NOT_FOUND,
        info: generateUserErrorInfo(user),
      });
    }
  }

  async resetPasswordForm(email, password, confirmPassword) {
    const user = await this.userDAO.getUserByEmail(email);
    if (!user) {
      CustomError.createError({
        name: "Error",
        message: "User not found by create error",
        code: EErrors.USER_NOT_FOUND,
        info: generateUserErrorInfo(user),
      });
    }
    if (password !== confirmPassword) {
      return CustomError.createError({
        name: "Error",
        message: "Las contraseñas no coinciden",
        code: EErrors.PASSWORD_NOT_VALID,
        info: generateUserErrorInfo(user),
      });
    }
    if (isValidPassword(user, password)) {
      return CustomError.createError({
        name: "Error",
        message: "La contraseña ingresada no puede ser igual a la anterior",
        code: EErrors.PASSWORD_NOT_VALID,
        info: generateUserErrorInfo(user),
      });
    }
    const newPassword = createHash(password);
    user.password = newPassword;
    await this.userDAO.updateUser(user._id, user);
    return user;
  }
  

  async validUserSentEmailPassword(email) {
    const user = await this.userDAO.getUserByEmail(email);
  
    if (user) {
        const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
      
      try {
        const result = transporter.sendMail({
          from: config.USER,
          to: email,
          subject: "Restablecer tu contraseña",
          html: `Haz click en el siguiente link para restablecer tu contraseña: localhost:8080/api/session/resetPasswordForm/${token}`,
        },
        function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
            return info.response;
          }
        })
       
        
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Email not send",
        code: EErrors.USER_RESET_PASSWORD_EMAIL_ERROR,
        info: generateUserErrorInfo(user),
      });
    }
    
    return user;
  }
}

async getTicketByUser(user) {
  try {
  
    const mail = user.email;
 
    const tickets = await this.ticketDAO.getTicketByUser(mail);
   
    return tickets;
  } catch (error) {
    CustomError.createError({
      name: "Error",
      message: "Ticket not found",
      code: EErrors.TICKET_NOT_FOUND,
      info: generateUserErrorInfo(user),
    });
  }
}

}
