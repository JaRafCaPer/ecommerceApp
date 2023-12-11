import UserDTO from "../DTO/user.dto.js";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { generateUserErrorInfo } from "../errors/info.js";
import nodemailer from "nodemailer";
import config from "../config/config.js";
import { ne } from "@faker-js/faker";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: config.USER,
    pass: config.PASS,
  },
});

export default class UserService {
  constructor(userDAO, cartDAO) {
    this.userDAO = userDAO;
    this.cartDAO = cartDAO;
  }
  async createUser(user) {
    try {
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
      const userDTOs = users.map((user) => new UserDTO(user));
      return userDTOs;
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Users not found",
        code: EErrors.USERS_NOT_FOUND,
        info: generateUserErrorInfo(users),
      });
    }
  }
  async getInactiveUsers() {
    try {
      const inactivePeriod = 2;
      const date = new Date();
      date.setDate(date.getDate() - inactivePeriod);
      const inactiveUsers = await this.userDAO.getInactiveUsers(date);

      if (inactiveUsers.length === 0) {
        CustomError.createError({
          name: "Error",
          message: "Users not found",
          code: EErrors.USERS_NOT_FOUND,
          info: generateUserErrorInfo(inactiveUsers),
        });
      }

      return { inactiveUsers, date };
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Inactive users not found",
        code: EErrors.USERS_NOT_FOUND,
        info: generateUserErrorInfo,
      });
    }
  }
  async deleteUsers(inactiveData) {
    try {
      const users = inactiveData.inactiveUsers;
      const date = inactiveData.date;
      const deletedUsers = await this.userDAO.deleteUsers(date);

      if (users.length === 0) {
        CustomError.createError({
          name: "Error",
          message: "No inactive users",
          code: EErrors.NO_INACTIVE_USERS,
          info: generateUserErrorInfo(users),
        });
      } else {
        users.forEach((users) => {
          const result = transporter.sendMail(
            {
              from: config.USER,
              to: users.email,
              subject: "account deleted",
              html: `your account have been deleted due to inactivity.`,
            },
            function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
                return info.response;
              }
            }
          );
        });
        return new UserDTO(users);
      }
    } catch (error) {
      CustomError.createError({
        name: "Error",
        message: "Users not deleted",
        code: EErrors.USERS_NOT_DELETED,
        info: generateUserErrorInfo(users),
      });
    }
  }
  async deleteUserById(id) {
    try {
      const userDeleted = await this.userDAO.deleteUserById(id);
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
  async uploadDocuments(id, files) {
    const user = await this.userDAO.getUserById(id);
    const uploadedDocuments = [];
    if (!user) {
      CustomError.createError({
        name: "Error",
        message: "User not exists",
        code: EErrors.USER_NOT_EXISTS,
        info: generateUserErrorInfo(user),
      });
    }

    if (files["profile"]) {
      const profile = files["profile"][0];
      uploadedDocuments.push({
        name: profile.originalname,
        reference: profile.path,
      });
    }
    if (files["product"]) {
      const product = files["product"][0];
      uploadedDocuments.push({
        name: product.originalname,
        reference: product.path,
      });
    }
    if (files["dni"]) {
      const dni = files["dni"][0];
      uploadedDocuments.push({
        name: dni.originalname,
        reference: dni.path,
      });
    }
    if (files["address"]) {
      const address = files["address"][0];
      uploadedDocuments.push({
        name: address.originalname,
        reference: address.path,
      });
    }
    if (files["state"]) {
      const state = files["state"][0];
      uploadedDocuments.push({
        name: state.originalname,
        reference: state.path,
      });
    }

    user.documents.push(...uploadedDocuments)

    console.log(user)

    const updatedUser = await this.userDAO.updateUser(user._id, user); // Cambiado a '_id'
    return updatedUser;
  }

  async getUserByEmail(email) {
    try {
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
        info: generateUserErrorInfo({ email }),
      });
    }
  }
}
