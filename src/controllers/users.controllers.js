import mongoose from "mongoose";
import CustomError from "../errors/CustomError.js";
import EErrors from "../errors/enums.js";
import { userService } from "../services/index.js";





export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    return res.render("users", { users });
  } catch (error) {
    req.logger.fatal("Error al obtener los usuarios");
    res.status(500).json({ error: error.message });
  }
}

export const deleteUserById = async (req, res) => {
  try {
    const id = req.params.uid;
    const user = await userService.getUserById(id);
    if (user) {
      if (user.rol === "admin") {
        CustomError.createError({
          message: "No authorized you can't delete an admin",
          code: EErrors.USER_NOT_AUTHORIZED,
          status: 401,
          info: generateUserErrorInfo({ uid }),
        });
      }
      else {
       const deletedUser = await userService.deleteUserById(id);
        return res.render("deletedUser", {deletedUser});
      }
    } 
  } catch (error) {
    req.logger.fatal("Error: User not deleted");
    res.status(500).json({ error: error.message });
  }
}

export const deleteUsers = async (req, res) => {
  try {
    const inactiveData = await userService.getInactiveUsers();
    if (inactiveData.inactiveUsers.length > 0) {
      const deletedUsers = await userService.deleteUsers(inactiveData);
  
      const inactiveUsers = inactiveData.inactiveUsers;
      return res.render("deletedUsers", {inactiveUsers})
    }
    else {
      req.logger.fatal("Error: No inactive users");
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    req.logger.fatal("Error deleting users");
    res.status(500).json({ error: error.message });
  }
}
export const userPremium = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await userService.getUserByEmail(email);
    if (user) {
      if (user.rol === "admin") {
        CustomError.createError({
          message: "No authorized",
          code: EErrors.USER_NOT_AUTHORIZED,
          status: 401,
          info: generateCartErrorInfo({ pid }),
        });
      }
      if (user.rol === "user" && user.documents.length >= 4) {
        user.rol = "premium";
        const udpUser = await userService.updateUser(user._id, user);
        return res.render("profile", udpUser);
      }
      if (user.rol === "premium") {
        user.rol = "user";
        const udpUser = await userService.updateUser(user._id, user);
        return res.render("profile", udpUser);
      }
    } else {
      CustomError.createError({
        message: "User not found",
        code: EErrors.USER_NOT_EXISTS,
        status: 404,
        info: generateCartErrorInfo({ pid }),
      });
    }
  } catch (error) {
    req.logger.fatal("Error changing user to premium");
    res.status(500).json({ error: error.message });
  }
};

export const uploadDocuments = async(req, res)=>{

  const id = req.params.uid;
  const email = req.user.user.email;
  const user = await userService.getUserByEmail(email);
  
  const files = req.files
  if (user.rol === "admin") {
    CustomError.createError({
      message: "No authorized to upload documents",
      code: EErrors.USER_NOT_AUTHORIZED,
      status: 401,
      info: generateCartErrorInfo({ pid }),
    });}
  const documents = await userService.uploadDocuments(id, files)
  return res.render("profile", {user, documents});
}

export const getAdminPanel = async (req, res) => {
  try {
    const email = req.user.user.email;
    const user = await userService.getUserByEmail(email);
    
    if (user) {
      if (user.rol === "admin") {
        const users = await userService.getUsers();
        return res.render("adminPanel", { users });
      } else {
        CustomError.createError({
          message: "No authorized",
          code: EErrors.USER_NOT_AUTHORIZED,
          status: 401,
          info: generateCartErrorInfo({ pid }),
        });
      }
    } else {
      CustomError.createError({
        message: "User not found",
        code: EErrors.USER_NOT_EXISTS,
        status: 404,
        info: generateCartErrorInfo({ pid }),
      });
    }
  } catch (error) {
    req.logger.fatal("Error al obtener el panel de administración");
    res.status(500).json({ error: error.message });
  }
}